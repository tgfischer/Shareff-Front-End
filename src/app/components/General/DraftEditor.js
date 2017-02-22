import React, {Component} from 'react';
import {Editor, EditorState} from 'draft-js';
import {convertToHTML} from 'draft-convert';

const styles = {
  input: {
    display: 'none'
  }
};

export class DraftEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }
  constructor(props) {
    super(props);
    this.handleOnChange = ::this.handleOnChange;
    this.handleOnClick = ::this.handleOnClick;
    this.editorRef = ::this.editorRef;
  }
  handleOnChange = editorState => this.setState({editorState});
  handleOnClick = () => this.editor.focus();
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
  required: React.PropTypes.bool
};
