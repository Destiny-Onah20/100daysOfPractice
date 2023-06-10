import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { mailInterface } from "../interfaces/mailInterface";
import hdb from "express-handlebars";
dotenv.config();



export default class mailSender {
  private static instance: mailSender
  private transporter: nodemailer.Transporter

  static getInstance() {
    if (!mailSender.instance) {
      mailSender.instance = new mailSender()
    }
    return mailSender.instance
  };
  async createConnection() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
    try {
      await this.transporter.verify();
      // console.log("MailSender connection established successfully.");
    } catch (error) {
      // console.error("Error establishing MailSender connection:", error);
    }
  };
  async mail(Option: mailInterface) {
    const mailOption = {
      from: process.env.EMAIL,
      to: Option.email,
      subject: Option.subject,
      text: Option.message
    }
    console.log(mailOption);
    const result = await this.transporter.sendMail(mailOption);
    console.log(result);

  }
  getTransporter() {
    return this.transporter;
  }
}


