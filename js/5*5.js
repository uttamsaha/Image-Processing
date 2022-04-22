let image = [];
let filter = [];
document.getElementById('filter').style.display = 'none';


//event handler
document.getElementById('selectedFilter').addEventListener('click', () => {
    const selectedFilter = document.getElementById('selectedFilter').value;

    if (selectedFilter === 'CrossCorrelation') {
        document.getElementById('filter').style.display = 'block';
        filter = [];
    }
    else if (selectedFilter === 'Weighted') {
        // filter = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625];
        document.getElementById('filter').style.display = 'none';
        alert('5*5 average weighted filter under construction. Will be back soon...');
        return;
    }
    else if (selectedFilter === 'Mean') {
        filter = [0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111];
        document.getElementById('filter').style.display = 'none';
    }
    else {
        filter = [];
    }
})

//event handler
document.getElementById('btn').addEventListener('click', () => {
    let array = [];
    const numberImage = document.getElementById('numberInput').value;
    const numberFilter = document.getElementById('filter').value;
    const mString = document.getElementById('m').value;
    const nString = document.getElementById('n').value;
    const stringImage = numberImage.split(',');
    const stringFilter = numberFilter.split(',');
    const table = document.getElementById('table');
    const filterField = document.getElementById('filter');
    const result = document.getElementById('result');
    const selectedFilter = document.getElementById('selectedFilter').value;


    table.innerHTML = '';

    for (let i = 0; i < stringImage.length; i++) {
        image[i] = parseFloat(stringImage[i]);
    }
    console.log(image.length);

    if (selectedFilter === 'CrossCorrelation') {
        for (let i = 0; i < stringFilter.length; i++) {
            filter[i] = parseFloat(stringFilter[i]);
        }
    }
    // if (numberFilter === '') {
    //     alert('Filter cannot be empty..');
    //     return;
    // }
    if (filter.length != 25) {
        alert('Your filter length should be 25');
        filter = [];
        return;
    }




    //updated
    let m = parseInt(mString);
    let n = parseInt(nString);

    let x = 0;
    let y = 1;
    let z = 2;
    let u = 3;
    let v = 4;
    let loop = ((m * n) - ((n * 4) + ((m - 4) * 4)));
    let newImage = [];
    let trackIndex = [0, 1, 2, 3, 4];

    for (let i = 0; i < loop; i++) {
        for (let i = 0; i < 20; i++) {
            let res = trackIndex[i] + n;
            trackIndex.push(res);
        }

        for (let i = 0; i < image.length; i++) {
            if (trackIndex[i] || trackIndex[i] == 0) {
                let x = image[trackIndex[i]];
                const tr = document.createElement('tr');
                tr.innerHTML = `
        <td>${x}</td>
        `;
                table.appendChild(tr);
                newImage.push(x);
            }
        }

        let sum = 0;
        for (let i = 0; i < newImage.length; i++) {
            let result = newImage[i] * filter[i];
            sum += result;
        }
        const h4 = document.createElement('h4');
        const span = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        const span4 = document.createElement('span');
        h4.innerHTML = `Result = ${sum} <br>`;
        table.appendChild(h4);
        table.appendChild(span);
        table.appendChild(span2);
        table.appendChild(span3);
        table.appendChild(span4);
        for (let i = 0; i < 25; i++) {
            trackIndex.pop();
            newImage.pop();
        }
        x++;
        y++;
        z++;
        u++;
        v++;
        trackIndex.push(x);
        trackIndex.push(y);
        trackIndex.push(z);
        trackIndex.push(u);
        trackIndex.push(v);
        console.log(trackIndex);

        ///increment index

        let index = (n - 1);
        if ((v == index) || (v == (index * 2) + 1) || (v == (index * 3 + 2)) || (v == (index * 4) + 3) || (v == (index * 5) + 4) || (v == (index * 6) + 5) || (v == (index * 7) + 6) || (v == (index * 8) + 7) || (v == (index * 9) + 8)) {
            x += 4;
            y += 4;
            z += 4;
            u += 4;
            v += 4;
        }

    }

})

//change image, filter, m, n && increment index.
// const image = [
//     0, 0, 0, 0, 0, 0, 0, 0, 73, 73, 73, 0, 0, 0, 0, 74, 57, 54, 3, 7, 0, 0, 47, 2, 72, 1, 99, 0, 0, 6, 27, 41, 2, 1, 0, 0, 72, 72, 54, 8, 205, 0, 0, 0, 0, 0, 0, 0, 0
// ];
// const filter = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625]; 3*3 weighted avg filter
// const filter = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625];
