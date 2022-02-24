const containerResult = document.getElementById('result');

const controlText = (text = '') => `<span id="controller">${text}</span>`;
const clean = () => containerResult.innerHTML = "";

function insert(num) {
    const controlSpan = document.getElementById('controller');
    if ((parseInt(num) || num === '0' || num === '.') && controlSpan) clean();
    else if (controlSpan) controlSpan.remove();

    let contents = containerResult.innerHTML;
    containerResult.innerHTML = contents + num;
}

function back() {
    let contents = containerResult.innerHTML;
    containerResult.innerHTML = contents.substring(0, contents.length - 1);
}

function calculate() {
    let contents = containerResult.innerHTML.replace(/×/g, '*');
    contents = contents.replace(/÷/g, '/');
    contents = contents.replace(/,/g, '.');

    const contentsCharStart = contents.charAt(0);
    const contentsCharEnd = contents.charAt(contents.length - 1);

    if (contents) {
        if (contentsCharStart !== "0" && contentsCharEnd !== "0") {
            if (contentsCharStart !== "+" && contentsCharStart !== "-") {
                if (!parseInt(contentsCharStart) || !parseInt(contentsCharEnd)) {
                    containerResult.innerHTML = controlText('Erro');
                    return;
                }
            }
        }

        let operatorIndex = Infinity;
        let pointCounter = 0;

        for (let i = 0; i < contents.length; i++) {
            if (contents[i] === ".") pointCounter++;

            if (pointCounter > 1) {
                containerResult.innerHTML = controlText('Erro');
                return;
            }

            if (contents[i] === "/" || contents[i] === "*" || contents[i] === "+" || contents[i] === "-") {
                if (i === (operatorIndex + 1)) {
                    containerResult.innerHTML = controlText('Erro');
                    return;
                }

                if (pointCounter > 0) pointCounter--;

                operatorIndex = i;
            }
        }

        const result =  eval(contents).toString().replace('.', ',');
        if (isFinite(operatorIndex)) {
            containerResult.innerHTML = controlText() + result;
        } else {
            containerResult.innerHTML = result;
        }
    }
}