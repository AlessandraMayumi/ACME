const express = require('express')
const Title = require('../../model/hr/title')
const Employee = require('../../model/hr/employee')

const router = express.Router()


// All Job Titles Route
router.get('/', async (req, res) => {
  let query = Title.find()
  if (req.query.title != null && req.query.title != '') {
      query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  try {
    const titles = await query.exec()
    const employees = await Employee.find({})
    res.render('hr/titles/index', {
      titles: titles,
      employees: employees,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})
  
// New Title Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Title())
})

// Create Title Route
router.post('/', async (req, res) => {
  const title = new Title({
    title: req.body.title,
    employee: req.body.employee,
    from_date: req.body.from_date,
    to_date: req.body.to_date
  })
  try {
    const newTitle = await title.save()
    res.redirect(`/hr/titles`)
  } catch {
    renderNewPage(res, title, true)
  }
})


async function renderNewPage(res, title, hasError = false) {
  try {
    const employees = await Employee.find({})
    const params = {
      employees: employees,
      title: title
    }
    if (hasError) params.errorMessage = 'Error Creating Title'
    res.render('hr/titles/new', params)
  } catch {
    res.redirect('/hr/titles')
  }
}

module.exports = router