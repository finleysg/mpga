import React, { ReactNode } from "react"

import { TiEdit } from "react-icons/ti"
import styled from "styled-components"

const EditButton = styled.div`
  float: right;
  width: 24px;
  height: 24px;
  text-align: right;
  margin: 0;
  cursor: pointer;
`
EditButton.displayName = "EditButton"

type ToggleEditProps = {
  isEditting: boolean
  openIcon?: ReactNode
  onToggled: () => void
}

const ToggleEditButton: React.FC<ToggleEditProps> = (props) => {
  const { openIcon, isEditting, onToggled } = props
  const open = openIcon || <TiEdit size={20} color={"warning"} />

  const handleClick = () => {
    onToggled()
  }

  return (
    <EditButton
      title={isEditting ? "Close" : "Edit"}
      className={isEditting ? "text-secondary" : "text-warning"}
      style={{ position: "relative", zIndex: 1 }}
      onClick={handleClick}
    >
      {!isEditting && open}
    </EditButton>
  )
}

export default ToggleEditButton
