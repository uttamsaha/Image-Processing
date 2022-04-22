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
        filter = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625];
        document.getElementById('filter').style.display = 'none';
    }
    else if (selectedFilter === 'Mean') {
        filter = [0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111, 0.11111111111];
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

    //image & filter
    //     const image = [
    //     91, 253, 253, 0, 252, 4, 254, 129, 12, 7, 7, 3, 53, 7, 252, 5, 5, 87, 133, 205, 29, 4, 5, 5, 252, 252, 252, 78, 18, 13
    // ];
    // const filter = [252, 29, 1, 29, 4, 5, 252, 78, 18];

    for (let i = 0; i < stringImage.length; i++) {
        image[i] = parseFloat(stringImage[i]);
    }

    if (selectedFilter === 'CrossCorrelation') {
        for (let i = 0; i < stringFilter.length; i++) {
            filter[i] = parseFloat(stringFilter[i]);
        }
    }
    // if(numberFilter === ''){
    //     alert('Filter cannot be empty..');
    //     return;
    // }
    if (filter.length != 9) {
        alert('Your filter length should be 9');
        return;
    }




    //updated
    let m = parseInt(mString);
    let n = parseInt(nString);

    let x = 0;
    let y = 1;
    let z = 2;
    let loop = ((m * n) - ((n * 2) + ((m - 2) * 2)));
    let newImage = [];
    let trackIndex = [0, 1, 2];

    for (let i = 0; i < loop; i++) {
        for (let i = 0; i < 6; i++) {
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
        h4.innerHTML = `Result = ${sum} <br>`;
        table.appendChild(h4);
        table.appendChild(span);
        table.appendChild(span2);
        for (let i = 0; i < 9; i++) {
            trackIndex.pop();
            newImage.pop();
        }
        x++;
        y++;
        z++;
        trackIndex.push(x);
        trackIndex.push(y);
        trackIndex.push(z);
        console.log(trackIndex);

        ///increment index

        let k = (n - 1);
        if (z == k || z == k * 2 + 1 || z == k * 3 + 2 || z == k * 4 + 3 || z == k * 5 + 4 || z == k * 6 + 5 || z == k * 7 + 6 || z == k * 8 + 7 || z == k * 9 + 8) {
            x += 2;
            y += 2;
            z += 2;
        }

    }
})

//change image, filter, m, n && increment index.
// const image = [
//     0, 0, 0, 0, 0, 0, 0, 0, 73, 73, 73, 0, 0, 0, 0, 74, 57, 54, 3, 7, 0, 0, 47, 2, 72, 1, 99, 0, 0, 6, 27, 41, 2, 1, 0, 0, 72, 72, 54, 8, 205, 0, 0, 0, 0, 0, 0, 0, 0
// ];
