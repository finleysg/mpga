import React, { useRef } from "react"

import { Highlighter, Typeahead, TypeaheadRef } from "react-bootstrap-typeahead"

import { Contact } from "../../models/Clubs"
import { useGetContactsQuery } from "../member-clubs/memberClubApi"

interface ContactLookup {
	id: number
	email: string
	label: string
	name: string
}

export interface IContactSearchProps {
	allowNew: boolean
	OnSelect: (contact: Contact) => void
}

const ContactSearch: React.FC<IContactSearchProps> = (props) => {
	const { data, isLoading } = useGetContactsQuery()
	const typeaheadRef = useRef<TypeaheadRef>()

	const contacts =
		data?.map((p) => {
			return {
				id: p.id,
				label: `${p.first_name} ${p.last_name}`,
				name: `${p.first_name} ${p.last_name}`,
				email: p.email,
			} as ContactLookup
		}) ?? []

	const handleSelect = (selected: ContactLookup) => {
		if (data && selected) {
			const selectedContact = data.find((d) => d.id === selected.id)
			if (selectedContact) {
				typeaheadRef.current?.clear()
				const contact = new Contact(selectedContact)
				props.OnSelect(contact)
			}
		}
	}

	return (
		<div className="mb-3">
			<p>
				First search for a contact already in our database. If you don't find one, select "Create
				new contact".
			</p>
			<Typeahead
				id="contact-search"
				ref={typeaheadRef}
				filterBy={["name", "email"]}
				placeholder="Search for contact..."
				isLoading={isLoading}
				minLength={3}
				renderMenuItemChildren={(option: ContactLookup, props) => (
					<>
						<Highlighter key="name" search={props.text}>
							{option.name}
						</Highlighter>
						<div key="email">
							<small>Email: {option.email}</small>
						</div>
					</>
				)}
				highlightOnlyResult={!props.allowNew}
				newSelectionPrefix={"Create new contact: "}
				allowNew={props.allowNew}
				onChange={(selected) => handleSelect(selected[0] as ContactLookup)}
				options={contacts}
			/>
		</div>
	)
}

export default ContactSearch
