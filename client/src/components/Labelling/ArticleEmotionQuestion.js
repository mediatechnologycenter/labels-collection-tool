import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";
import PlutchikSelector8WithIntensitySlider from "./PlutchikSelector8WithIntensitySlider";

class ArticleEmotionQuestion extends React.Component {
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
                        <h5>Emotion of the whole article</h5>
                        <p>What emotion better summarized the one conveyed by all the text of the article? </p>
                    </Col>
                </Row>
                <Row className={"pb-1"} style={{background: this.props.error ? "#FF9991" : null}}>
                    <Col>
                        <PlutchikSelector8WithIntensitySlider emotionStatus={this.props.emotionStatus}
                                                              onClick={this.props.onClick}
                                                              onClickIntensity={this.props.onClickIntensity}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
  }
}

export default ArticleEmotionQuestion;