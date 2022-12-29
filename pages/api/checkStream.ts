import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean,
  streaming: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let response = {
    success: true,
    streaming: false
  }

  const logError = (error: Error)=>{
    console.error('Error:', error)
    failGracefully()
  }

  const logBadResponse = (badResponse: string)=>{
    console.error('Error:', badResponse)
    failGracefully()
  }

  const failGracefully = ()=>{
    response.success = false
    res.status(500).json(response)
  }

  const twitchTokenResponse = await fetch('https://id.twitch.tv/oauth2/token?client_id=' + process.env.TWITCH_CLIENT_ID + '&client_secret=' + process.env.TWITCH_CLIENT_SECRET + '&grant_type=client_credentials', {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((response) => response.json())
    .then((result)=>{
      if(result.status) logBadResponse(result)
      return result
    })
    .catch((error) => {
      logError(error)
    })

  let data = await twitchTokenResponse

  if(!await data.access_token) return false
  else {
    const twitchResponse = await fetch('https://api.twitch.tv/helix/streams?user_login=' + process.env.TWITCH_USER_LOGIN, {
      method: 'GET',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID + '',
        'Authorization': 'Bearer ' + data.access_token
      }
    })
      .then((response) => response.json())
      .then((result)=>{
        if(result.error) logBadResponse(result)
        return result
      })
      .catch((error) => {
        logError(error)
      })

    data = await twitchResponse

    if(!data.error) {
      if(data.data && data.data.length > 0) response.streaming = true
      res.status(200).json(response)
    }
  }
}
