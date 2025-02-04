import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { SettingService } from '../settings/service/setting.service'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private readonly botToken: string
  private readonly chatId: string
  private readonly apiUrl: string

  constructor(private readonly http: HttpClient, private settingService: SettingService) {
    this.settingService.getAllSettings()
    this.botToken = this.settingService.setting?.telegramKey ?? ''
    this.chatId = this.settingService.setting?.telegramBotId ?? ''
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables')
    }
    if (!this.chatId) {
      throw new Error('TELEGRAM_CHAT_ID is not defined in environment variables')
    }
    this.apiUrl = `https://api.telegram.org/bot${this.botToken}`
  }

  async sendMessage(message: string): Promise<any> {
    const url = `${this.apiUrl}/sendMessage`
    const payload = {
      chat_id: this.chatId,
      text: message,
      parse_mode: 'Markdown', // или 'HTML' в зависимости от форматирования
    }

    try {
      return await firstValueFrom(
        this.http.post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      )
    } catch (error) {
      throw error
    }
  }
}
