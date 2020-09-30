(function() {
    return {
        title: '',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div class='joke-generator-page'>
        <div class='main-content'>
            <div class='main-content-wrapper'>
                <a href='#' class='header-logo'>MSI 2020</a>
                <div class='welcome-block'>
                    <p class='welcome-text-lg'>Hey!</p>
                    <p class='welcome-text-md'>Let’s try to find a joke for you:</p>
                </div>
                <form action='https://api.chucknorris.io/jokes/' class='select-joke-form' id='select-joke-form'>
                    <div class='form_radio'>
                        <input id='random-joke' type='radio' name='joke-type' value='random-joke'>
                        <label for='random-joke'>Random</label>
                    </div>

                    <div class='form_radio'>
                        <input id='joke-from-category' type='radio' name='joke-type' value='joke-from-category'>
                        <label for='joke-from-category'>From categories</label>
                    </div>
                    <div class='additon-parameters' id='joke-categories-list'></div>

                    <div class='form_radio'>
                        <input id='search-joke' type='radio' name='joke-type' value='search-joke'>
                        <label for='search-joke'>Search</label>
                    </div>
                    <div class='form-group additon-parameters' id='joke-search-field'>

                    </div>

                    <input type='submit' id='find-joke' class='btn btn-send-form' value='Get a joke' disabled>
                </form>

                <div class='joke-list' id='joke-list'></div>
            </div>
        </div>
        <div class='right-open-btn' id='menuToggle'>
            <input type='checkbox' id='menuToggleInput' />
            <span class='first-child'></span>
            <span></span>
            <span></span>
        </div>
        <h2 class='favorite-jokes-title toggle'>Favorite</h2>
          <div class='blocker' id='blocker'>
          </div>
        <div class='favorite-jokes-sidebar' id='favorite-jokes-sidebar'>
            <h3 class='favorite-jokes-title'>Favorite</h3>
            <div id='favorite-jokes-feed' class='favorite-jokes-feed'>
                <!--
                <div class='favorite-joke-item'>
                    <span class='joke-favorite-icon sidebar-favorite-icon active'></span>
                    <span class='joke-type joke-type-grey favorite-joke-type'>
                        <i class='joke-type-text-icon'>
                            <span class='joke-type-text-line'></span>
                            <span class='joke-type-text-line'></span>
                            <span class='joke-type-text-line'></span>
                        </i>
                    </span>
                    <p class='joke-id'>ID: <a href='#' class='joke-id-link'>XNaAxUduSw6zANDaIEab7A <i class='joke-id-link-icon'></i></a></p>
                    <p class='favorite-joke-text'>No one truly knows who's Chuck Norris' real father. 
                    No one is biologically strong enough for this. He must've conceived himself.</p>
                    <p class='joke-last-update'>Last update: 1923 hours ago</p>
                </div>
-->
            </div>
        </div>
    </div>
                    `
        ,
        afterViewInit: function() {
            this.load()
        },
        load: function() {
            const selectJokeTypeRadio = document.querySelectorAll('#select-joke-form input[type=radio][name="joke-type"]');
            selectJokeTypeRadio.forEach(elem => elem.addEventListener('click', function() {
                const jokeTypes = [{
                    name: 'joke-from-category',
                    callback: getJokeCategoriesList,
                    containerSelector: '#joke-categories-list'
                }, {
                    name: 'search-joke',
                    callback: showJokeSearchField,
                    containerSelector: '#joke-search-field'
                }];

                const form = this.closest('form');
                const additionalParams = form.querySelectorAll('.additon-parameters');
                additionalParams.forEach(elem => elem.innerHTML = '');

                if (this.value !== 'random-joke') {
                    const {
                        callback,
                        containerSelector
                    } = jokeTypes.find(({
                        name
                    }) => name === this.value);
                    const jokeCategoriesList = form.querySelector(containerSelector);
                    jokeCategoriesList.insertAdjacentHTML('beforeend', callback());
                    if (this.value === 'joke-from-category') {
                        jokeCategoriesList.addEventListener('click', function({
                            target
                        }) {
                            switchItems(this, target, 'joke-category', 'selected');
                        });
                    }
                }

                form.querySelector('input[type=submit]').removeAttribute('disabled');
            }));
            const jokeList = document.getElementById('joke-list');
            const favoriteJokesList = document.getElementById('favorite-jokes-feed');
            let favoriteJokes = [];
            if(localStorage.getItem('favorite-jokes')) {
                favoriteJokes = JSON.parse(localStorage.getItem('favorite-jokes'));
                const jokesArr = favoriteJokes.map(joke => createFavoriteJoke(joke));
                favoriteJokesList.append(...jokesArr);
            }
            const findJokeForm = document.getElementById('select-joke-form');
            findJokeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let url = this.action;
                const jokeType = this.querySelector('input[type=radio][name="joke-type"]:checked').value;
                if (jokeType === 'random-joke') {
                    url += 'random';
                } else if (jokeType === 'search-joke') {
                    const searchPharse = this.querySelector('input[name="search-joke-text"]').value;
                    url += `search?query=${searchPharse}`;
                } else if (jokeType === 'joke-from-category') {
                    const {
                        category
                    } = this.querySelector('#joke-categories-list .joke-category.selected').dataset;
                    url += `random?category=${category}`;
                }
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        if (result.total) {
                            const jokesArr = result.result.map(joke => {
                                const favoriteJoke = favoriteJokes.find(item => item.id === joke.id);
                                joke.active = favoriteJoke ? 'active' : false;
                                const newJoke = createJoke(joke);
                                return newJoke;
                            });
                            jokeList.append(...jokesArr);
                        } else {
                            const jokeItem = createJoke(result);
                            jokeList.insertAdjacentElement('beforeend', jokeItem);
                        }
                    });
            });

            function getJokeCategoriesList() {
                return `<div class='joke-categories'>
                            <span class='joke-category selected' data-category='animal'>animal</span>
                            <span class='joke-category' data-category='career'>career</span>
                            <span class='joke-category' data-category='celebrity'>celebrity</span>
                            <span class='joke-category' data-category='dev'>dev</span>
                        </div>`;
            }

            function switchItems(itemsList, target, itemClass, itemActiveClass) {
                if (target.classList.contains(itemClass)) {
                    const prevSelectedElem = itemsList.querySelector(`.${itemClass}.${itemActiveClass}`);
                    prevSelectedElem.classList.remove(itemActiveClass);
                    target.classList.add(itemActiveClass);
                }
            }

            function showJokeSearchField() {
                return '<input class="search-field" type="text" name="search-joke-text" placeholder="Free text search...">';
            }

            function createJoke({id, updated_at, url, categories, value, active}) {
                const jokeCreateDate = new Date(updated_at);
                const hoursAfteUpdate = Math.ceil((new Date() - jokeCreateDate) / (1000 * 3600));
                const joke = document.createElement('div');
                joke.className = 'joke-item';
                joke.dataset.id = id;
                joke.insertAdjacentHTML('beforeend', `
                        <span class='joke-type'>
                            <i class='joke-type-text-icon'>
                                <span class='joke-type-text-line'></span>
                                <span class='joke-type-text-line'></span>
                                <span class='joke-type-text-line'></span>
                            </i>
                        </span>
                        <span class='joke-favorite-icon ${active || ''}'></span>
                        <p class='joke-id'>ID: <a href='${url}' class='joke-id-link'>${id} <i class='joke-id-link-icon'></i></a></p>
                        <p class='joke-text'>${value}</p>
                        <div class='joke-info'>
                            <span class='joke-last-update'>Last update: ${hoursAfteUpdate} hours ago</span>
                            ${(categories[0]) ? `<span class='joke-category'>${categories[0]}</span>` : ''}
                        </div>`);
                joke.addEventListener('click', function({target}) {
                    const {classList} = target;
                    if(classList.contains('joke-favorite-icon')) {
                        if(!classList.contains('active')) {
                            const favoritejokeInfo = {id, updated_at, url, categories, value, active: 'active'};
                            favoriteJokes.push(favoritejokeInfo);
                            localStorage.setItem('favorite-jokes', JSON.stringify(favoriteJokes));
                            const favoriteJoke = createFavoriteJoke(favoritejokeInfo);
                            favoriteJokesList.insertAdjacentElement('beforeend', favoriteJoke);
                        } else {
                            const deleteFavoriteJoke = document.querySelector(`.favorite-joke-item[data-id=${id}]`);
                            deleteFavoriteJoke.remove();
                            const index = favoriteJokes.findIndex(item => item.id === id);
                            localStorage.setItem('favorite-jokes', JSON.stringify(favoriteJokes));
                            favoriteJokes.splice(index, 1);
                        }
                        classList.toggle('active');
                    }
                });
                return joke;
            }
            function createFavoriteJoke({id, updated_at, url, value}) {
                const jokeCreateDate = new Date(updated_at);
                const hoursAfteUpdate = Math.ceil((new Date() - jokeCreateDate) / (1000 * 3600));
                const joke = document.createElement('div');
                joke.className = 'favorite-joke-item';
                joke.dataset.id = id;
                joke.insertAdjacentHTML('beforeend', `
                        <span class='joke-type'>
                            <i class='joke-type-text-icon joke-type-grey favorite-joke-type'>
                                <span class='joke-type-text-line'></span>
                                <span class='joke-type-text-line'></span>
                                <span class='joke-type-text-line'></span>
                            </i>
                        </span>
                        <span class='joke-favorite-icon sidebar-favorite-icon active'></span>
                        <p class='joke-id'>ID: <a href='${url}' class='joke-id-link'>${id} <i class='joke-id-link-icon'></i></a></p>
                        <p class='favorite-joke-text'>${value}</p>
                        <div class='joke-info'>
                            <p class='joke-last-update'>Last update: ${hoursAfteUpdate} hours ago</p>
                        </div>`);
                joke.addEventListener('click', function({target}) {
                    if(target.classList.contains('joke-favorite-icon')) {
                        const deleteFavoriteJoke = document.querySelector(`.favorite-joke-item[data-id='${id}']`);
                        deleteFavoriteJoke.querySelector('.joke-favorite-icon').classList.remove('active');
                        const deleteJoke = document.querySelector(`.joke-list .joke-item[data-id='${id}']`);
                        if(deleteJoke) {
                            deleteJoke.querySelector('.joke-favorite-icon').classList.remove('active');
                        }
                        const index = favoriteJokes.findIndex(item => item.id === id);
                        favoriteJokes.splice(index, 1);
                        localStorage.setItem('favorite-jokes', JSON.stringify(favoriteJokes));
                        this.remove();
                    }
                });
                return joke;
            }
            document.getElementById('menuToggle').addEventListener('click',()=>{
                const menuToggleInput = document.getElementById('menuToggleInput');
                const rightSide = document.getElementById('favorite-jokes-sidebar');
                const blocker = document.getElementById('blocker')
                if (menuToggleInput.checked) {
                    rightSide.classList.add('active');
                    blocker.classList.add('active');
                } else {
                    rightSide.classList.remove('active');
                    blocker.classList.remove('active');
                }
            })
        }
    };
}());
