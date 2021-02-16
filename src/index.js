const API = process.env.API
const DB_NAME = process.env.DB_NAME

const LBS_KG = 0.45359237
const GAL_L = 3.79
const MIL_KM = 1.609

const tableItems = [
  {
    propName: 'Name',
    colName: 'Marka i Model',
  },
  {
    propName: 'Miles_per_Gallon',
    colName: 'Zużycie paliwa [l/100km]'
  },
  {
    propName: 'Horsepower',
    colName: 'Moc [KM]'
  },
  {
    propName: 'Acceleration',
    colName: 'Przyspieszenie [s]'
  },
  {
    propName: 'Weight_in_lbs',
    colName: 'Waga [kg]'
  },
  {
    propName: 'Year',
    colName: 'Rok'
  }
]



const getData = async(id) => {
  const url = `${API}/${DB_NAME}${id ? `/${id}` : ''}`
  let data
  try {
    const resp = await fetch(url)
    data = await resp.json()
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}

const addData = async(lineData) => {
  const url = `${API}/${DB_NAME}`
  try {
    const resp = await fetch(url, {
      method: 'POST', 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify(lineData)
    })
    const savedData = await resp.json()
    return savedData
  } catch (err) {
    console.log(err)
    return err
  }
}

const changeData = async(lineData) => {
  const url = `${API}/${DB_NAME}/${lineData.id}`
  try {
    const resp = await fetch(url, {method: 'PUT', headers: {"Content-Type": "application/json"}, body: JSON.stringify(lineData)})
  } catch (err) {
    console.log(err)
    return err
  }
}

const deleteData = async(lineData) => {
  const url = `${API}/${DB_NAME}/${lineData.id}`
  try {
    const resp = await fetch(url, {method: 'DELETE'})
    return resp
  } catch (err) {
    console.log(err)
    return err
  }
}



const createLine = (lineData, lineNo) => {
  const tableLine = document.createElement('tr')
  tableLine.id = lineData.id

  // No. column element
  let colElem = document.createElement('td')
  colElem.innerText = lineNo
  tableLine.appendChild(colElem)
  // data column elements
  tableItems.forEach(col => {
    colElem = document.createElement('td')
    colElem.innerText = lineData[col.propName]
    tableLine.appendChild(colElem)
  })
  // operations column element - edit
  colElem = document.createElement('button')
  colElem.id = `btn-edit-${lineData.id}`
  colElem.innerText = 'Edytuj'
  tableLine.appendChild(colElem)
  colElem.addEventListener('click', editHandler)
  // operations column element - delete
  colElem = document.createElement('button')
  colElem.id = `btn-delete-${lineData.id}`
  colElem.innerText = 'Usuń'
  tableLine.appendChild(colElem)
  colElem.addEventListener('click', deleteHandler)
  
  return tableLine
}

const fillInData = (initData) => {
  let result = {}
  if (initData) result = initData
  else tableItems.forEach(item => result[item.propName] = '')
  console.log(result)
  return result
}

const refreshTable = async () => {
  console.log(data)
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.lastChild);
  }
  data.forEach((d, i) => {
    const line = createLine(d, i + 1)
    tbody.appendChild(line)
  })
}

const addC4Handler = async (event) => {
  console.log('Add C4')
  const d = {
      "id": null,
      "Name":"Citroen C4",
      "Miles_per_Gallon":20,
      "Cylinders":4,
      "Displacement":307,
      "Horsepower":150,
      "Weight_in_lbs":2504,
      "Acceleration":9,
      "Year":"2015",
      "Origin":"France"
  }
  const savedData = await addData(d);
  console.log(savedData)
  data.push(savedData)
  await refreshTable()
}

const addHandler = async (event) => {
  console.log('Add data')
  const d = fillInData()
  const savedData = await addData(d);
  console.log(savedData)
  data.push(savedData)
  await refreshTable()
}

const editHandler = async (event) => {
  const id = event.target.id.replace('btn-edit-', '')
  console.log('Edit data of id: ', id)
}

const deleteHandler = async (event) => {
  const id = event.target.id.replace('btn-delete-', '')
  const index = data.findIndex(d => (d.id + '') === id)
  
  const deletedData = await deleteData(data[index]);
  console.log(deletedData)
  data.splice(index, 1)
  console.log(data)
  await refreshTable()
}

const intro = () => {
  appElem = document.getElementById('app')
  tbody = document.getElementById('tbody')

  btnAddElem = document.getElementById('btn-add')
  btnAddElem.addEventListener('click', addHandler)

  btnAddElem = document.getElementById('btn-add-c4')
  btnAddElem.addEventListener('click', addC4Handler)

  console.log(`Let's play!`)

  const h1 = document.createElement('h1')
  h1.innerText = `Let's play!`
  appElem.appendChild(h1)
  console.log(h1)
}


const main = async () => {
  intro()
  data = await getData()
  await refreshTable(data)
}

let data = null
let appElem = null
let tbody = null
let btnAddElem = null
let btnAddC4Elem = null

main()

