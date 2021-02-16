(function(){
    "use strict";

    // global state
    let state = {
        data: [],
        single: null
    };

    // elements
    var q = document.getElementById('q');
    var search = document.querySelector('.search');
    var result = document.getElementById('result-container');

    // assign search icon
    let qIcon = document.createElement('span');
    qIcon.classList.add('lni');
    qIcon.classList.add('lni-search-alt');
    qIcon.classList.add('qicon');
    search.appendChild(qIcon);


    // reset state and visul
    function resetSS () {
        state.data.splice(0, state.data.length);
        result.innerHTML = '';
    }

    // on search event
    document.getElementById('s').addEventListener('click', () => fetchQuery(q.value));

    // fetch function
    var fetchQuery = async function (q) {

        // make previous data cleaned
        resetSS();

        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
        .then(response => response.json())
        .then(data => {
            state.data = [...data.meals];
            console.log(state);
            makeVisualResult();
        })
        .catch(err => console.log(err))
    };

    // loop per elements in DOM
    var makeVisualResult = function() {
        let r = document.createElement('div');
        r.classList.add('result');

        state.data.map(dt => {
            let rs = document.createElement('div');
            rs.classList.add('rs-item');
            rs.setAttribute('data-id', dt.idMeal);
            let rsImg = document.createElement('img');
            rsImg.src = dt.strMealThumb;
            let rsh3 = document.createElement('h3');
            rsh3.innerText = dt.strIngredient4;
            rsImg.src = dt.strMealThumb;

            // assign them
            rs.appendChild(rsImg);
            rs.appendChild(rsh3);
            r.appendChild(rs);
        });

        // assign root-element
        result.appendChild(r);


        // onCLick
        var rsItems = document.querySelectorAll('.rs-item');
        rsItems.forEach(el => {
            el.addEventListener('click', function(){
                viewSingle(el.dataset.id);
            });
        });

        // reset input value
        q.value = '';
    };

    



    




    // view single item
    var viewSingle = async function (Id) {
        // fetch
        await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            state.single = data.meals[0]
        })
        .catch(err => console.log(err))

        // when data is ready
        if (state.single !== null && typeof(state.single) === 'object' ) {
            // console.log('time to display single card only')
            resetSS(); // others cleared
            var card = document.createElement('div');
            card.classList.add('food-card');
            let sng = state.single;
            var customJSX = `
                <div class="fd-wrap">
                    <img src="${sng.strMealThumb}" />
                    <div class="fd-details">
                        <h3>${sng.strIngredient4}</h3>
                        <br />
                        <h5>Ingredients</h5>
                        <ul class="fd-ind">
                            <li>${sng.strMeasure1}</li>
                            <li>${sng.strMeasure2}</li>
                            <li>${sng.strMeasure3}</li>
                            <li>${sng.strMeasure4}</li>
                            <li>${sng.strMeasure5}</li>
                            <li>${sng.strMeasure6}</li>
                            <li>${sng.strMeasure7}</li>
                            <li>${sng.strMeasure8}</li>
                        </ul>
                    </div>
                </div>
            `;

            card.innerHTML = customJSX;

            // assign in result
            search.style.display='none';
            result.appendChild(card);
        }
    };



})();