// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

import React from "react";
import {Button, Col, Row} from "reactstrap";
import Badge from "reactstrap/es/Badge";
import {CopyToClipboard} from "react-copy-to-clipboard";
import axios from "axios";

class TokenGeneratorRow extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {currToken: null};

        this.handleNewToken = this.handleNewToken.bind(this);
    }

    static defaultProps = {
        color: "primary",
        adminToken: null
    };

    static getTemplateEmail(token) {
        const link = "https://experiment.mtc.ethz.ch/instructions?token=" + token + "&email=true";

        return `Lieber [name],
Vielen Dank, dass Sie sich für das Emotionen & Standpunkt Projekt von MTC angemeldet haben. 
Sie können die Anleitungen lesen und dann mit der Arbeit beginnen indem Sie auf diesen Link klicken: ${link} . Dadurch wird auch Ihr Konto bestätigt.

Bitte notieren Sie sich Ihre persönliche ID (Token) für die zukünftige Verwendung: ${token}

Wenn Sie ein Problem oder eine Anfrage haben, können Sie gerne auf diese E-Mail antworten und wir werden uns mit Ihnen in Verbindung setzen.
Danke, dass Sie uns helfen, die Forschung voranzubringen!
Ich wünsche Ihnen alles Gute,
Emotionen & Standpunkt Projekt des MTC-Teams`;
    }

    handleNewToken() {
        axios.get("/admindashboard/gentoken"+ "?token=" + this.props.adminToken)
            .then(res => {
                this.setState({
                    currToken: res.data.token
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    currToken: null
                });
            });
    }

    render() {
        return <Row className={"mb-4"}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button onClick={() => this.handleNewToken()}>Generate new token</Button>

                <Badge className={"ml-5 mr-3"} color="info">{this.state.currToken}</Badge>
                {!this.state.currToken ? null : <><CopyToClipboard text={this.state.currToken}>
                    <Button color="info">Copy to clipboard</Button>
                </CopyToClipboard>
                <CopyToClipboard text={TokenGeneratorRow.getTemplateEmail(this.state.currToken)}>
                    <Button className={"ml-3"} color="info">Copy email template to clipboard</Button>
                </CopyToClipboard>
                </>}
            </Col>
        </Row>;
    }
}

export default TokenGeneratorRow;
