(function() {
    return {
        title: '',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div class='container'>
                        <div class='main' id='main'>

                        </div>
                    </div>
                    `
        ,
        afterViewInit: function() {
            let executeQuery = {
                queryCode: 'test_Vitalii_api',
                parameterValues: [],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.openApi, this);
        },
        openApi({rows}) {
            const arr = rows.map(elem=>JSON.parse(elem.values[1]))
            this.load(arr)
        },
        load: function(data) {
            const title = document.getElementById('title');
            title.remove();
            const apiArr = data[0]
            const mainCon = document.getElementById('main');
            const unique = apiArr.map(elem=>elem.about.category);
            const uniqueArr = unique.filter((elem,index)=>unique.indexOf(elem) === index)
            const categories = uniqueArr.map(item=>{
                const index = uniqueArr.indexOf(item)
                return `<li class='category-item item${index}' data-name='${item}'><a href='#' class='category-link' >${item} 
               </a><div class='api-main-con'></div></li>`
            }).join('');
            mainCon.insertAdjacentHTML('beforeend',`<ul class='category-list'>${categories}</ul>`)
            const categoryNodes = Array.from(document.querySelectorAll('.category-item'))
            apiArr.map(elem=>{
                const int = `<div class='api-con' data-category='${elem.about.category}'>
                <div class='api ${(elem.request.method).toLowerCase()}'>
                    <span class='api-method ${(elem.request.method).toLowerCase()}'>${elem.request.method}</span>
                    <span class='api-description '>${elem.about.description}</span>
                </div>
                    <div class='api-info'>
                        <div class='request-con'>
                            <div class='request-con-title block-api-title'>
                                <h4 class='request-title block-title'>Request</h4>
                            </div>
                                <div class='request-con-info con-info'>
                                    <div class='request-auth'>
                                        <h4 class='info-title'>Authorization</h4>
                                        <p class='url info-text'>${elem.request.headers.Authorization}</p>
                                    </div>
                                    <div class='request-url'>
                                        <h4 class='info-title'>Request URL</h4>
                                        <p class='url info-text'>${elem.request.url}</p>
                                    </div>
                                    <div class='headers-con'>
                                        <h4 class='info-title'>Headers</h4>
                                        <p class='headers info-text'>${elem.request.headers.ContentType}</p>
                                    </div>
                                    <div class='body-con'>
                                        <h4 class='info-title'>Body</h4>
                                        <p class='headers info-text'>${elem.request.body}</p>
                                    </div>
                                </div>
                            <div class='response-con-title block-api-title'>
                                <h4 class='response-title block-title'>Response</h4>
                            </div>    
                                <div class='response-con-info con-info'>
                                    <div class='response'>
                                        <h4 class='info-title'>Server response</h4>
                                        <p class='headers info-text'>${elem.response.result}</p>
                                    </div>
                                    <div class='response-error'>
                                        <h4 class='info-title'>Server error</h4>
                                        <p class='headers info-text'>${elem.response.error}</p>
                                    </div>
                                </div>
                        </div>

                    </div>
                </div>`
                categoryNodes.forEach(item=>{
                    if(item.dataset.name === elem.about.category) {
                        const apiCon = item.querySelector('.api-main-con')
                        apiCon.insertAdjacentHTML('beforeend',`${int}`)
                    }
                })
                this.toggleListener()
                return int
            })
        },
        toggleListener() {
            const categoryNodes = Array.from(document.querySelectorAll('.category-link'))
            const api = Array.from(document.querySelectorAll('.api'))
            categoryNodes.forEach(elem=>elem.addEventListener('click',this.toggleInfo))
            api.forEach(elem=>elem.addEventListener('click',this.toggleMethod))

        },
        toggleInfo(e) {
            e.preventDefault()
            const con = e.target.closest('.category-item')
            const int = con.querySelector('.api-main-con')
            if(int.classList.contains('active')) {
                $(int).fadeOut()
                int.classList.remove('active')
            } else {
                $(int).fadeIn()
                int.classList.add('active')
            }
        },
        toggleMethod(e) {
            const con = e.target.closest('.api-con')
            const int = con.querySelector('.api-info')
            if(int.classList.contains('active')) {
                $(int).fadeOut()
                int.classList.remove('active')
            } else {
                $(int).fadeIn()
                int.classList.add('active')
            }
        }
    };
}());
