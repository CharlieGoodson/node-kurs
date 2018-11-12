module.exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
    res.status(404).render('404', {
        pageTitle: 'Error 404 - Page not found',
        path: ''
    })
}