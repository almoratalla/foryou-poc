export const getAccessParams = () => {
    const url = new URL(window.location)
    const params = url.searchParams;
    let error = params.get('error')
    let access_token = params.get('access_token')
    let refresh_token = params.get('refresh_token')
    return { error, access_token, refresh_token}
}

export const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}