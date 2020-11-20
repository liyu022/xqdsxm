const mkTree = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].children.length != 0) {
            data[i].component = () => import('./pages/Main.vue')
            data[i].path = data[i].funUrl
            data[i].name = data[i].funName
            for (let j = 0; j < data[i].children.length; j++) {
                if (data[i].children[j].children.length == 0) {
                    data[i].children[j].component = () => import('./pages' + data[i].funUrl + data[i].children[j].funUrl + '.vue')
                    data[i].children[j].path = data[i].funUrl + data[i].children[j].funUrl
                    data[i].children[j].name = data[i].children[j].funName
                } else {
                    data[i].children[j].component = () => import('./pages/Main.vue')
                    data[i].children[j].path = data[i].children[j].funUrl
                    data[i].children[j].name = data[i].children[j].funName
                    for (let k = 0; k < data[i].children[j].children.length; k++) {
                        let coms = () => import('./pages' + data[i].funUrl + data[i].children[j].children[k].funUrl + '.vue')
                        data[i].children[j].children[k].component = coms
                        data[i].children[j].children[k].path = data[i].funUrl + data[i].children[j].children[k].funUrl
                        data[i].children[j].children[k].name = data[i].children[j].children[k].funName
                    }

                }

            }

        }
    }
    return data
}

const mkTree2 = (data) => {
    for (let i = 0; i < data.length; i++) {

        if (data[i].children == undefined || data[i].children.length == 0) {
            data[i].path = data[i].url
        } else {
            if (data[i].children.length > 0) {
                data[i].component = () => import('./pages/Main.vue')
                mkTree2(data[i].children)
            }

        }

    }


    return data
}
/*let da= mkTree2(config.mks)
console.log(da);*/
export {mkTree}
