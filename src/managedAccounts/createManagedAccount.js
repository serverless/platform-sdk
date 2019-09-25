import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, captchaToken, tenant }) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants/${tenant}/managedAccounts`, {
    method: 'POST',
    headers: { Authorization: `bearer ${accessKey}`, 'X-Captcha-Token': captchaToken },
    body: JSON.stringify({})
  })

  return response.json()
}
