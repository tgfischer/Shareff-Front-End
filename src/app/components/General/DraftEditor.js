import React, {Component} from 'react';
import validator from 'validator';
import {Editor, EditorState, ContentState} from 'draft-js';
import {convertToHTML, convertFromHTML} from 'draft-convert';

const styles = {
  input: {
    display: 'none'
  }
};

export class DraftEditor extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.editorRef = this.editorRef.bind(this);

    let editorState;

    // If there is a default value, insert it in the editor
    if (props.defaultValue) {
      const blockArray = convertFromHTML(validator.unescape(props.defaultValue));
      const contentState = ContentState.createFromBlockArray(blockArray.getBlocksAsArray());

      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {editorState};
  }
  handleOnChange(editorState) {
    this.setState({editorState});
  }
  handleOnClick() {
    this.editor.focus();
  }
  editorRef(editor) {
    this.editor = editor;
  }
  render() {
    const {label, name, placeholder, required} = this.props;
    const {editorState} = this.state;

    return (
      <div className={required ? "required field" : "field"}>
        <label>{label}</label>
        <div onClick={this.handleOnClick} className="editor">
          <Editor
            placeholder={placeholder}
            editorState={editorState}
            onChange={this.handleOnChange}
            ref={this.editorRef}
            />
          <input
            name={name}
            style={styles.input}
            value={convertToHTML(editorState.getCurrentContent())}
            type="text"
            readOnly
            />
        </div>
      </div>
    );
  }
}

DraftEditor.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  defaultValue: React.PropTypes.string
};
