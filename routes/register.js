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

const router = require('express').Router();

/**** Deprecated */

const nodemailer = require('nodemailer');
const {getCorrectLabellersSchema} = require("./utils");
const labellers = getCorrectLabellersSchema();
const config = require("../config");

function sendRegistrationEmailAndWriteInDB(name, surname, email, affiliation, smtpTrans, res) {
    const newLabeller = new labellers({
        name: name,
        surname: surname,
        email: email,
        affiliation: affiliation,
        confirmedEmail: false
    });

    return newLabeller.save()
        .then(savedObject => savedObject._id)
        .then(idToken => {
            const link = process.env.BASE_LINK + "/instructions?token=" + idToken + "&email=true";
            // Specify what the email will look like
            const mailOpts = {
                from: process.env.EMAIL, // This is ignored by Gmail
                to: email,
                subject: '[MTC] Emotionen & Standpunkt Projekt - Anmeldung',
                text:
                    `Lieber ${name},
Vielen Dank, dass Sie sich für das Emotionen & Standpunkt Projekt von MTC angemeldet haben. 
Sie können die Anleitungen lesen und dann mit der Arbeit beginnen indem Sie auf diesen Link klicken: ${link}. Dadurch wird auch Ihr Konto bestätigt.

Bitte notieren Sie sich Ihre persönliche ID (Token) für die zukünftige Verwendung: ${idToken}

Wenn Sie ein Problem oder eine Anfrage haben, können Sie gerne auf diese E-Mail antworten und wir werden uns mit Ihnen in Verbindung setzen.
Danke, dass Sie uns helfen, die Forschung voranzubringen!
Ich wünsche Ihnen alles Gute,
Emotionen & Standpunkt Projekt des MTC-Teams`
            };
            return smtpTrans.sendMail(mailOpts).then(info => console.log(info));
        })
        .then(() => {
            console.log("Email sent successfully. Successfully recorded on DB.");
            res.json('OK. Email sent successfully. Successfully recorded on DB.');
        });
}

function sendAlreadyExistingEmail(name, surname, email, affiliation, idToken, smtpTrans, res) {
    console.log("Email already exists in DB, resending email.");
    const link = process.env.BASE_LINK + "/labelling?token=" + idToken + "&email=true";
    // Specify what the email will look like
    const mailOpts = {
        from: process.env.EMAIL, // This is ignored by Gmail
        to: email,
        subject: '[MTC] Emotionen & Standpunkt Projekt - bereits angemeldet',
        text:
            `Lieber ${name},
Sie haben versucht, diese E-Mail zu benutzen, um sich für die Emotionen & Standpunkt Projekt des MTC zu anmelden, aber die E-Mail wird bereits verwendet. 
Sie können die Anleitungen lesen und dann mit der Arbeit beginnen indem Sie auf diesen Link klicken: ${link}. Dadurch wird auch Ihr Konto bestätigt.

Bitte notieren Sie sich Ihre persönliche ID (Token) für die zukünftige Verwendung: ${idToken}

Wenn Sie ein Problem oder eine Anfrage haben, können Sie gerne auf diese E-Mail antworten und wir werden uns mit Ihnen in Verbindung setzen.
Danke, dass Sie uns helfen, die Forschung voranzubringen!
Ich wünsche Ihnen alles Gute,
Emotionen & Standpunkt Projekt des MTC-Teams`
    };

    return smtpTrans.sendMail(mailOpts).then(info => console.log(info))
        .then(() => {
            console.log("Email sent successfully.");
            res.status(400).json({error: null, message: "E-Mail bereits in Gebrauch. Eine zweite E-Mail mit dem Link " +
                    "zum Beginn der Studie wurde per E-Mail (" + email +  ") verschickt. Bitte benutzen Sie diesen " +
                    "Link oder eine andere E-Mail"});
        });
}

// POST route from contact form
router.route('/').post((req, res) => {
    console.log("Receveid new email.");
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    const {name, surname, email, affiliation} = req.body;

    //first check that given email is not already in the se of registered mails
    return labellers.findOne({email: email}).exec()
        .then(queryRes => {
            //exists already
            if(queryRes !== null) {
                return sendAlreadyExistingEmail(name, surname, email, affiliation, queryRes._id, smtpTrans, res);
            }
            //doesn't exist already
            return sendRegistrationEmailAndWriteInDB(name, surname, email, affiliation, smtpTrans, res);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: "Interner Serverfehler, bitte versuchen Sie es erneut."});
        });
});

module.exports = router;