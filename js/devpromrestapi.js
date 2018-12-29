const apiKey = '5ad7f50f87cf7c0c298d62353bd11f62';

const logEl = document.getElementById('log');


function showTasks() {
    let reqUrl = 'http://alm.mtuci.ru/pm/bst1601_group1/api/v1/tasks';

    const taskExec = document.getElementById('task-exec').value;
    if (taskExec) {
        reqUrl += `?executor=${taskExec}`;
    }

    fetch(reqUrl, {
        headers: {
            'Devprom-Auth-Key': apiKey
        }
    })
        .then ( response => {
            return response.json();
        } )
        .then( tasks => {
            tasks.forEach( task => {
                pushToLog(`Задача: ${task.UID} ${task.Caption}. Состояние: ${task.State}`);
            } );
        } );
}

function createTask() {
    const reqUrl = 'http://alm.mtuci.ru/pm/bst1601_group1/api/v1/tasks';

    const data = {
        Caption: document.getElementById('task-title').value,
        Priority: document.getElementById('task-priority').value
    };
    fetch(reqUrl, {
        headers: {
            'Devprom-Auth-Key': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then ( response => {
            return response.json();
        } )
        .then( res => {
            pushToLog(`Задача ${res.UID} ${res.Caption} была добавлена!`);
        } );
}

function pushToLog(title) {
    const taskEl = document.createElement('li');
    taskEl.className = 'collection-item';
    taskEl.innerHTML = `<strong>${title}</strong>`;
    logEl.insertBefore(taskEl, logEl.firstElementChild);
}

function clearLog() {
    logEl.innerHTML = '';
}