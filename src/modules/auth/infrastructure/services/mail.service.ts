import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT ?? '587'),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async enviarCodigoReset(correo: string, codigo: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"SIGMAT SENA" <${process.env.MAIL_USER}>`,
        to: correo,
        subject: 'Código de restablecimiento de contraseña - SIGMAT',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #39A900; margin: 0;">SIGMAT</h2>
              <p style="color: #6B7280; font-size: 13px; margin: 4px 0 0;">Sistema de Gestión de Materiales - SENA</p>
            </div>
            <div style="background: #fff; border-radius: 10px; padding: 28px; border: 1px solid #E5E7EB;">
              <h3 style="color: #111827; margin: 0 0 12px;">Restablece tu contraseña</h3>
              <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta. Usa el siguiente código:
              </p>
              <div style="background: #F0FDF4; border: 2px dashed #39A900; border-radius: 10px; padding: 20px; text-align: center; margin: 0 0 20px;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #39A900;">${codigo}</span>
              </div>
              <p style="color: #6B7280; font-size: 13px; margin: 0;">
                Este código expira en <strong>15 minutos</strong>. Si no solicitaste este cambio, ignora este correo.
              </p>
            </div>
            <p style="color: #9CA3AF; font-size: 12px; text-align: center; margin-top: 20px;">
              SENA · Centro de Formación
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error('[MailService] Error al enviar correo:', err);
      throw new InternalServerErrorException('No se pudo enviar el correo. Verifica la configuración de email.');
    }
  }
}
