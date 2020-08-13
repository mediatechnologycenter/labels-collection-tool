import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";

class CommentsInstructions extends React.Component {
    static defaultProps = {
        instructionsTextColor: "#1e0ead"
    };

  render() {
      return (
          <>
            <Container className="shape-container align-items-center pt-4" style={{
                color: this.props.instructionsTextColor
            }}>
                <Row>
                    <Col>
                        <h4>Comment section</h4>
                            Please now read the following comments. For each comment, on the right:
                            <ul>
                                <li>
                                    Click on the emotion that replies to the question:  <br/>
                                    "Which is the emotion conveyed in this comment?" <br/>
                                    Again you can only select one emotion per comment. Select the emotion that best matches the emotion conveyed in the comment.  <br/>
                                </li>
                                <li>
                            Click on the stance that replies to the question: <br/>
                            "Is this comment in favour or against the article?" <br/>
                            Please bear in mind that the question refers to <b>the stance of the comment towards the
                                    article and not towards the previously presented topic.</b> <br/>
                                    </li>
                                </ul>

                    </Col>
                </Row>
            </Container>
        </>
    );
  }
}

export default CommentsInstructions;
