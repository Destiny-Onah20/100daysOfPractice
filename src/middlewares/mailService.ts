import nodemailer  from "nodemailer";
import dotenv from "dotenv";
import { mailInterface } from "../interfaces/mailInterface";
dotenv.config();

export default class mailSender {
  private static instance : mailSender
  private transporter : nodemailer.Transporter

  // public constructor(){

  // }

  static getInstance () {
    if(!mailSender.instance){
      mailSender.instance = new mailSender()
    }
    return mailSender.instance
  };
  async createConnection(){
    this.transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
  }
   async mail ( Option: any) {
  return await this.transporter.sendMail({
    from: process.env.EMAIL,
    to: Option.email,
    subject: Option.subject,
    text: Option.text
  })
  }

}