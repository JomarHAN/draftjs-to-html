import React, { Component } from "react";
import {
  Editor as EditorOrigin,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import ReactDOM from "react-dom";

class DraftTest extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    comment: null,
    convertedContent: null,
    convertHtml: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      convertedContent: EditorState.createWithContent(
        convertFromRaw(this.state.comment)
      ),
    });
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
      comment: convertToRaw(editorState.getCurrentContent()),
      convertedContent: EditorState.createWithContent(
        editorState.getCurrentContent()
      ),
      convertHtml: stateToHTML(editorState.getCurrentContent()),
    });
    // ReactDOM.render(
    //   stateToHTML(editorState.getCurrentContent()),
    //   document.getElementById("displayContent")
    // );
  };
  render() {
    // console.log(this.state.convertHtml);
    return (
      <div>
        <div id="comment-form-div">
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="editer-content"
            onEditorStateChange={this.onChange}
          />
        </div>
        <div id="comment-button-div">
          <button id="comment-submit-button" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
        {/* <div>
          <EditorOrigin
            editorState={
              !this.state.convertedContent
                ? EditorState.createEmpty()
                : this.state.convertedContent
            }
            readOnly={true}
          />
        </div> */}
        <div id="displayContent">{this.state.convertHtml}</div>
      </div>
    );
  }
}

export default DraftTest;
