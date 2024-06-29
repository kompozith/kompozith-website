import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

const adminEmail = "gilleskemgoum@gmail.com";

admin.initializeApp();

// Fonction qui envoie un e-mail lorsqu"un document est créé dans une collection
export const sendEmailOnMessageReceived = functions.firestore
  .document("messages/{documentId}")
  .onCreate(async (snapshot, context) => {
    try {
      // Récupérer les données du document créé
      const newData = snapshot.data();

      // Envoyer l"e-mail
      await sendEmail(newData);

      console.log("E-mail envoyé avec succès");
    } catch (error) {
      console.error("Erreur lors de l\"envoi de l\"e-mail:", error);
    }
  });

/**
 * Fonction pour envoyer un e-mail.
 * @param {any} data Données à inclure dans l'e-mail.
 * @return {Promise<void>} Une promesse résolue une fois l'e-mail envoyé.
 */
async function sendEmail(data: any) {
  // Configuration du transporteur SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gilleskemgoum@gmail.com",
      pass: "xvahdlfnnqzpgeva",
    },
  });

  // Paramètres de l"e-mail
  const mailOptions = {
    from: "contact@kompozith.com",
    to: adminEmail,
    subject: "Nouveau message reçu",
    text: `Un nouveau message a été enregistré.\n\nDonnées du message :
          \n${JSON.stringify(data, null, 2)}`,
  };

  // Envoi de l"e-mail
  await transporter.sendMail(mailOptions);
}
