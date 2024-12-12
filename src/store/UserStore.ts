import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IContactData, IUserData } from "../services/Data"
import { apiUrl, authUrl, httpClient } from "../utilities/HttpClient"

export interface IRegisterData {
	firstName: string
	lastName: string
	email: string
	password?: string
	confirmPassword?: string
}

export interface IUserStateFlags {
	isBusy: boolean
	hasError: boolean
	errorMessage?: string
	pendingPasswordReset: boolean
	passwordResetConfirmed: boolean
	accountExists: boolean
	accountActivated: boolean
	accountCreated: boolean
}

export const defaultStateFlags: IUserStateFlags = {
	errorMessage: "",
	isBusy: false,
	hasError: false,
	pendingPasswordReset: false,
	passwordResetConfirmed: false,
	accountExists: false,
	accountActivated: false,
	accountCreated: false,
}

export interface IUserState {
	user: Partial<IUserData>
	contact?: IContactData
	accountRequest?: IRegisterData
	committeeId?: number
	clubId?: string
	flags: IUserStateFlags
}

export const defaultState: IUserState = {
	user: { is_authenticated: false },
	flags: defaultStateFlags,
}

const getUser = createAsyncThunk("users/getUser", async () => {
	return (await httpClient(authUrl("/users/me/"))) as IUserData
})

const getContactRoles = createAsyncThunk("users/getContactRoles", async (email: string) => {
	return await httpClient(apiUrl("/contact-roles/?email=" + email))
})

const login = createAsyncThunk("users/login", async (data: { email: string; password: string }) => {
	return await httpClient(authUrl("/token/login/"), {
		body: JSON.stringify({
			username: data.email,
			email: data.email,
			password: data.password,
		}),
	})
})

const logout = createAsyncThunk("users/logout", async () => {
	return await httpClient(authUrl("/token/logout/"), { method: "POST" })
})

const createAccount = createAsyncThunk("users/createAccount", async (data: IRegisterData) => {
	const accountRequest = {
		email: data.email,
		first_name: data.firstName,
		last_name: data.lastName,
		password: data.password,
		re_password: data.confirmPassword,
	}
	return await httpClient(authUrl("/users/"), { body: JSON.stringify(accountRequest) })
})

const updateAccount = createAsyncThunk("users/updateAccount", async (data: Partial<IUserData>) => {
	return await httpClient(authUrl("/users/me/"), { body: JSON.stringify(data) })
})

const getContact = createAsyncThunk("users/getContact", async (email: string) => {
	return (await httpClient(apiUrl(`/contacts/?email=${email}`))) as IContactData
})

const saveContact = createAsyncThunk("users/saveContact", async (data: Partial<IContactData>) => {
	return await httpClient(apiUrl(`/contacts/${data.id}/`), {
		method: "PATCH",
		body: JSON.stringify(data),
	})
})

const resetPassword = createAsyncThunk("users/resetPassword", async (email: string) => {
	return await httpClient(authUrl("/users/reset-password/"), { body: email })
})

const confirmPasswordReset = createAsyncThunk(
	"users/confirmPasswordReset",
	async (data: { uid: string; token: string; new_password: string }) => {
		return await httpClient(authUrl("/users/reset-password-confirm/"), {
			body: JSON.stringify(data),
		})
	},
)

const changePassword = createAsyncThunk(
	"users/changePassword",
	async (data: { password: string; new_password: string; re_new_password: string }) => {
		return await httpClient(authUrl("/users/change-password/"), { body: JSON.stringify(data) })
	},
)

const activateAccount = createAsyncThunk(
	"users/activateAccount",
	async (data: { uid: string; token: string }) => {
		return await httpClient(authUrl("/users/activation/"), { body: JSON.stringify(data) })
	},
)

const userSlice = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		resetUser: (state) => {
			state.user = defaultState.user
			state.flags = defaultStateFlags
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.flags = defaultStateFlags
			})
			.addCase(getUser.rejected, (state) => {
				state.flags = { ...defaultStateFlags, hasError: true }
			})
			.addCase(getContactRoles.fulfilled, (state, action) => {
				// TODO: verify
				const committeeId = action.payload.committee[0]?.id
				const clubId = action.payload.club[0]?.club__system_name
				state.clubId = clubId
				state.committeeId = committeeId
			})
			.addCase(login.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(login.fulfilled, (state) => {
				state.flags = defaultStateFlags
			})
			.addCase(login.rejected, (state, action) => {
				state.flags = { ...defaultStateFlags, hasError: true }
				state.flags.errorMessage = action.error.message
			})
			.addCase(createAccount.pending, (state, action) => {
				state.accountRequest = action.meta.arg
				state.flags.isBusy = true
			})
			.addCase(createAccount.fulfilled, (state) => {
				state.flags = { ...defaultStateFlags, accountCreated: true }
			})
			.addCase(createAccount.rejected, (state, action) => {
				let exists = false
				if (action.error.message === "user already exists") {
					exists = true
				}
				state.flags.isBusy = false
				state.flags.accountExists = exists
				state.flags.hasError = true
				state.flags.errorMessage = exists
					? "We already have an account for you."
					: action.error.message
			})
			.addCase(getContact.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(getContact.fulfilled, (state, action) => {
				state.contact = action.payload
				state.flags = defaultStateFlags
			})
			.addCase(getContact.rejected, (state, action) => {
				state.flags = { ...defaultStateFlags, hasError: true }
				state.flags.errorMessage = action.error.message
			})
			.addCase(saveContact.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(saveContact.fulfilled, (state) => {
				state.flags = defaultStateFlags
			})
			.addCase(saveContact.rejected, (state, action) => {
				state.flags = { ...defaultStateFlags, hasError: true }
				state.flags.errorMessage = action.error.message
			})
			.addCase(resetPassword.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.flags = { ...defaultStateFlags, pendingPasswordReset: true }
			})
			.addCase(confirmPasswordReset.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(confirmPasswordReset.fulfilled, (state) => {
				state.flags = { ...defaultStateFlags, passwordResetConfirmed: true }
			})
			.addCase(confirmPasswordReset.rejected, (state, action) => {
				state.flags = { ...defaultStateFlags, hasError: true }
				state.flags.errorMessage = action.error.message
			})
			.addCase(activateAccount.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(activateAccount.fulfilled, (state) => {
				state.flags = { ...defaultStateFlags, accountActivated: true }
			})
			.addCase(activateAccount.rejected, (state, action) => {
				state.flags = { ...defaultStateFlags, hasError: true }
				state.flags.errorMessage = action.error.message
			})
			.addCase(changePassword.pending, (state) => {
				state.flags.isBusy = true
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.flags = defaultStateFlags
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.flags = { ...defaultStateFlags, hasError: true }
				state.flags.errorMessage = action.error.message
			})
	},
})

export {
	activateAccount,
	changePassword,
	confirmPasswordReset,
	createAccount,
	getContact,
	getContactRoles,
	getUser,
	login,
	logout,
	resetPassword,
	saveContact,
	updateAccount,
}
export const { resetUser } = userSlice.actions
export default userSlice.reducer
