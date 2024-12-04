export async function waitFor(
  waitForChanges: () => Promise<any>,
  fn: () => boolean
): Promise<void> {
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      void waitForChanges().then(() => {
        if (fn()) {
          clearInterval(interval)
          resolve('')
        }
      })
    }, 100)
  })
}

export async function waitForMs(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}

export const mockedAccessToken =
  'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJPblZOcUZPTUpuIiwic2x1ZyI6ImRyb3AtaW4tanMiLCJlbnRlcnByaXNlIjp0cnVlLCJyZWdpb24iOiJldS13ZXN0LTEifSwiYXBwbGljYXRpb24iOnsiaWQiOiJkTm5XbWl4eEtHIiwiY2xpZW50X2lkIjoia3VTS1BiZUtiVTlMRzlMam5kemllS1dSY2ZpWEZ1RWZPME9ZSFhLSDlKOCIsImtpbmQiOiJzYWxlc19jaGFubmVsIiwicHVibGljIjp0cnVlfSwibWFya2V0Ijp7ImlkIjpbIkJvd2RHaHdYZGoiXSwic3RvY2tfbG9jYXRpb25faWRzIjpbIkRuZ2VwdU5tT2siLCJLR3lPanV5S1hNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmNvZGU6dXNhIiwiZXhwIjoxNzMzMjIxOTI2LCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjQ3ODIwMDY1NTkwOTQzNjgzLCJpYXQiOjE3MzMyMTQ3MjYsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.L9FciSGb9eeV7NEZIsouLaVXFXdkscgF6Dd2pOF_alXaobQRLTevxTrudpKGAZ6b619myBR8cS4Lvw_YGm6smCHsw0VDHZrsnp-0xN4C6gjhPVC2lycX68H3s2HeI_CTHv4Cw4INrCg7lyvKjsKz2A_hm4GtpWejV1JB44qKObyi7bkXuFApUCBFChjbquI2z2ACw9mJxCf6PPfgIF7Ezb7OjbIuDnFbtxd0dnIneNlubsHAZ-lxlBqol0DmQ7i7pinYO0C0r1AcMhM1u76S7cTbOTBpYM81xfseslYOZpP8x2aJ9PIZxDjkdNMRCDyhq2fSEqCmoCLGhcsfz6ElbsiosIrdTPGDPN3i1Xtr-wxdviInK4wN1qFoG_r-y8XKsIj7EYL80fF0CQJoZPdHdeT8_QhtDKPsuyhe8arM2anSZm2fe7DmWpSeLbfTIDFB27Au8tE6gaSuaDwk8G_v7uyzhKlZaOXVj6m_o9JWRmzFu38-bwnt_Vu9cXDUx9_gyNDnoIE_qQFe0EYFx0U32arFdjZBYoUL4aeFBhkcBiCxLGEUJyqF65Tx4fhG_y62b-OJl6GCPkL4Xg9G3RAVLsQwD-Gzt8vsT63Ve9NeU10Rn-0kW3r6I3Qw9gU2wynWh3EuJfc7-YL6MQS0W25Dop3NHXKqLrd9wQ_AdIgbQkE'
