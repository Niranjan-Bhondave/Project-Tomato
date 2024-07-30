import React from 'react'
import './appDownload.css'
import assets from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className="appDownload" id='appDownload'>
        <p>For better experience download <br />our app</p>
        <div className="appDownloadPlatforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload
