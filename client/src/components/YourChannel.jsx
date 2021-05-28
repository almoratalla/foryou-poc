import React, { Fragment, useState, useEffect } from 'react';
import styles from '../screens/Profile.module.scss';
import { token, logout } from "../youtube"

const renderUploadsList = (list) => {
    return list.map((el,i) => {
        return (
            <li key={`li-${el?.contentDetails.videoId}-i-${Math.random()}`}>
                {/* <div style={{position: 'relative'}}> */}
                    <div className={styles.card__video}>
                        <img src={el.snippet.thumbnails.maxres.url} alt="" />
                        <div className={styles.card__info}>
                            <h5>
                                {el.snippet.title}
                            </h5>
                            <span>{el.snippet.videoOwnerChannelTitle}</span>
                        </div>
                    </div>
                    {/* <iframe title="vid" frameBorder="0" scrolling="no" allow="autoplay; encrypted-media; fullscreen" allowtransparency="true" marginHeight="0" marginWidth="0"width="407" height="206" type="text/html" src={`https://www.youtube.com/embed/${el?.contentDetails.videoId}?fs=1&iv_load_policy=3&rel=0&cc_load_policy=1&start=0&end=0`}></iframe> */}
                {/* </div> */}
            </li>
        );
    });
}


const YourChannel = () => {
    const [profileThumbnail, setProfileThubmnail] = useState();
    const [profileLocalized, setProfileLocalized] = useState('');
    const [profileStatistics, setProfileStatistics] = useState('');
    const [profileUploadsList, setProfileUploadsList] = useState([]);
    const [profileLikedVideosList, setProfileLikedVideosList] = useState([]);
    const [profilePlaylistsList, setProfilePlaylistsList] = useState([]);

    

    const onLoadProfile = async () => {
        const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?access_token=${token}&part=contentDetails%2Cstatistics%2CcontentOwnerDetails%2Csnippet&mine=true`,{ headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
        const json = await data.json();
        console.log(json)
        const snippetThumbnail = json?.items[0].snippet.thumbnails.high.url
        const localizedTitle = json?.items[0].snippet.localized;
        const statistics = json?.items[0].statistics;
        const profileVideosUploadsId = json?.items[0].contentDetails.relatedPlaylists.uploads;
        const profileLikedVideosId = json?.items[0].contentDetails.relatedPlaylists.likes;

        const data2 = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?access_token=${token}&part=id%2CcontentDetails%2Csnippet%2Cstatus&playlistId=${profileVideosUploadsId}`,{ headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
        const json2 = await data2.json();
        console.log('uploads playlist data:',json2)
        const items = json2.items;

        const data3 = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?access_token=${token}&part=id%2CcontentDetails%2Csnippet%2Cstatus&playlistId=${profileLikedVideosId}`,{ headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});
        const json3 = await data3.json();
        console.log('liked playlist data:',json3)
        const items2 = json3.items;

        const data4 = await fetch(`https://www.googleapis.com/youtube/v3/playlists?access_token=${token}&part=contentDetails%2Cid%2Clocalizations%2Cplayer%2Csnippet%2Cstatus&mine=true`)
        const json4 = await data4.json();
        console.log('your playlists data:',json4)
        const items3 = json4.items;

        setProfileThubmnail(snippetThumbnail);
        setProfileLocalized(localizedTitle);
        setProfileStatistics(statistics);
        setProfileUploadsList(items)
        setProfileLikedVideosList(items2);
        setProfilePlaylistsList(items3);
    }

    useEffect(() => {
        onLoadProfile();
        document.title = `ForYou - ${profileLocalized?.title}`
    },[profileLocalized.title])

    return (
        <Fragment>
            <div className={styles.container__profilehero}>
                <img src={profileThumbnail} alt="profile pic"/>
                <h1>{profileLocalized?.title}</h1>
                <ul className={styles.container__profilestatistics}>
                    <li>
                        <span className={styles.profilestats__count}>{profileStatistics?.viewCount}</span>
                        <span>Total Views</span>
                    </li>
                    <li>
                        <span className={styles.profilestats__count}>{profileStatistics?.subscriberCount}</span>
                        <span>Subscribers</span>
                    </li>
                    <li>
                        <span className={styles.profilestats__count}>{profileStatistics?.videoCount}</span>
                        <span>Videos</span>
                    </li>
                </ul>
                {/* <span>{profileLocalized?.description || 'No description'}</span> */}
                <button className={styles.foryou__signout} onClick={logout}>Sign out</button>
            </div>
            <div className={styles.container__profilevideos}>
                <h3>Your Uploads</h3>
                <ul className={styles.profilevideos__ul}>
                    { (profileUploadsList?.length && renderUploadsList(profileUploadsList)) || <span>No uploads found</span>}
                </ul>
            </div>
            <div className={styles.container__likedvideos}>
                <h3>Your Liked Videos</h3>
                <ul className={styles.profilevideos__ul}>
                    { (profileLikedVideosList?.length && renderUploadsList(profileLikedVideosList)) || <span>No uploads found</span>}
                </ul>
            </div>
            <div className={styles.container__likedvideos}>
                <h3>Your Playlists</h3>
                <ul className={styles.profilevideos__ul}>
                    { (profilePlaylistsList?.length && renderUploadsList(profilePlaylistsList)) || <span>No uploads found</span>}
                </ul>
                    </div>
        </Fragment>
    )
}

export default YourChannel
