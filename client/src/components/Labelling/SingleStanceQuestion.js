//   Copyright 2021 ETH Zurich, Media Technology Center
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

import React from "react";

import {Col, Row} from "reactstrap";
import StanceSelectorOrizontal from "./StanceSelectorOrizontal";

class SingleStanceQuestion extends React.Component {
    static defaultProps = {
        instructionsTextColor: "#1e0ead"
    };

  render() {
      return (
          <>
                <Row style={{background: this.props.error ? "#FF9991" : null,
                    color: this.props.instructionsTextColor}}>
                    <Col>
                    <h5>{this.props.children}</h5>
                    </Col>
                </Row>
                <Row className={"mb-4"}>
                    <Col>
                <StanceSelectorOrizontal onClick={this.props.onClick}
                                         stanceStatus={this.props.stanceStatus}/>
                    </Col>
                </Row>
        </>
    );
  }
}

export default SingleStanceQuestion;
