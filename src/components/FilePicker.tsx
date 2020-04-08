import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const getColor = (props: any) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const FileDropContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;
FileDropContainer.displayName = "FileDropContainer";

const FileList = styled.aside`
    > ul {
        list-style-type: none;
        > li {
            color: #purple;
        }
    }
`;
FileList.displayName = "FileList";

const defaultFileTypes: string = ".md,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/markdown,text/csv,text/plain";

export interface IFilePickerProps {
    multiple?: boolean;
    accept?: string;
    OnSelected: (files: any[]) => void;
}

const FilePicker: React.FC<IFilePickerProps> = (props) => {

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        multiple: props.multiple || false,
        accept: props.accept || defaultFileTypes,
        onDrop: acceptedFiles => {
            props.OnSelected(acceptedFiles);
        }
    });

    const files = acceptedFiles.map((file: any) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <FileDropContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
                <input {...getInputProps()} />
                <p>Drop file here, or click to select</p>
            </FileDropContainer>
            <FileList>
                <ul>{files}</ul>
            </FileList>
        </section>
    );
}

export default FilePicker;
