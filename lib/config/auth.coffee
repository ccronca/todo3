# expose our config directly to our application using module.exports
module.exports =
  facebook:
    clientID: "492026427591841" # your App ID
    clientSecret: "df6f2408401679ca974458d916abe202" # your App Secret
    callbackURL: process.env.FACEBOOK_CALLBACK or "http://localhost:9000/auth/facebook/callback"

  twitter:
    consumerKey: "your-consumer-key-here"
    consumerSecret: "your-client-secret-here"
    callbackURL: "http://localhost:9000/auth/twitter/callback"

  google:
    clientID: "your-secret-clientID-here"
    clientSecret: "your-client-secret-here"
    callbackURL: "http://localhost:9000/auth/google/callback"

  github:
    clientID: "APP_ID"
    clientSecret: "APP_SECRET"
    callbackURL: "http://localhost:9000/auth/github/callback"

  linkedin:
    clientID: "API_KEY"
    clientSecret: "SECRET_KEY"
    callbackURL: "http://localhost:9000/auth/linkedin/callback"
