import React from "react";

// reactstrap components
import {Col, Row} from "reactstrap";
import PlutchikSelector8WithIntensityCompact from "./PlutchikSelector8WithIntensityCompact";

class Paragraph extends React.Component {
    static defaultProps = {
        contentBackgroundColor: "#f2f0e6",
    };

  render() {
      return (
            <Row className={"m1-3 mb-2 pt-1 pb-1 align-items-center"}
                 style={{background: this.props.error ? "#FF9991" : null,
                 overflow: "hidden"}}
            >

                <Col style={{background: this.props.contentBackgroundColor,
                    height: "100%",
                    paddingTop: 1000,
                    marginTop: -1000,
                    paddingBottom: 1000,
                marginBottom:-1000}}
                     xs={12} sm={7} md={7} lg={7} xl={7}>
                    {this.props.children}
                </Col>
                <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    <PlutchikSelector8WithIntensityCompact selectedEmotion={this.props.selectedEmotion} onClick={this.props.onClick}/>
                </Col>
            </Row>
    );
  }
}

export default Paragraph;
