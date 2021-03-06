const networkErrorMsg = 'Network error. Unable to process request'

export function searchUsers({ language, location, followers, repos, login, showPerPage, page }, token) {
    let queryParts = []
    queryParts.push(`type:user`)
    if (language) {
        queryParts.push(`language:${encodeURIComponent(language)}`)
    }
    if (location) {
        queryParts.push(`location:${encodeURIComponent(location)}`)
    }
    if (repos) {
        queryParts.push(`repos:>=${repos}`)
    }
    if (login) {
        queryParts.push(`user:${encodeURIComponent(login)}`)
    }
    if (followers) {
        queryParts.push(`followers:>=${followers}`)
    }
    
    let query = queryParts.join('+')
    let url = `https://api.github.com/search/users?q=${query}&per_page=${showPerPage}&page=${page}`
    console.log(url)

    return processGET(url, token)
}

export function getUserInfo(url, token) {
    return processGET(url, token)
}

export function getUserRepos(url, token) {
    return processGET(url, token)
}

function processGET(url, token) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        request.open('GET', url)
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        
        request.onload = () => {
            if (request.status === 200) {
                resolve(request.response)
            } else {
                console.log(request.response)
                reject(Error(request.statusText))
            }
        }
    
        request.onerror = () => {
            console.log(request.response)
            reject(Error(networkErrorMsg))
        }
    
        request.send()
    })
}