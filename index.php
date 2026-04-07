<?php require_once 'db.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Library System</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="Assets/style.css"/>
</head>
<body>


<nav class="navbar navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand"> Library Management System</a>
    <div class="ms-auto d-flex gap-3">
      <span class="nav-link" onclick="showSection('catalog')">Catalog</span>
      <span class="nav-link" onclick="showSection('add')">Add Book</span>
    </div>
  </div>
</nav>

<div class="container py-4">

  
  <div id="alertBox" class="alert d-none mb-3"></div>

 
  <div id="catalogSection">
    <h4 class="mb-3">Book Catalog <span id="bookCount" class="fs-6 text-muted"></span></h4>
    <div class="row" id="catalog">
      <p class="text-muted">Loading...</p>
    </div>
  </div>

  
  <div id="addSection" style="display:none;">
    <h4 class="mb-3">Add New Book</h4>

    <div class="mb-3">
      <label class="form-label">Title <span class="text-danger">*</span></label>
      <input type="text" id="title" class="form-control" placeholder="Book title">
      <div class="invalid-feedback" id="titleError"></div>
    </div>

    <div class="mb-3">
      <label class="form-label">Author <span class="text-danger">*</span></label>
      <input type="text" id="author" class="form-control" placeholder="Author name">
      <div class="invalid-feedback" id="authorError"></div>
    </div>

    <div class="mb-3">
      <label class="form-label">ISBN <span class="text-muted small">(optional)</span></label>
      <input type="text" id="isbn" class="form-control" placeholder="e.g. 978-3-16-148410-0">
      <div class="invalid-feedback" id="isbnError"></div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label">Genre <span class="text-danger">*</span></label>
        <select id="genre" class="form-select">
          <option value="">— Select Genre —</option>
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Science</option>
          <option>History</option>
          <option>Technology</option>
          <option>Biography</option>
          <option>Poetry</option>
          <option>Mystery</option>
          <option>Romance</option>
          <option>Other</option>
        </select>
        <div class="invalid-feedback" id="genreError"></div>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Year <span class="text-danger">*</span></label>
        <input type="number" id="year" class="form-control" placeholder="e.g. 2023" min="1000" max="2099">
        <div class="invalid-feedback" id="yearError"></div>
      </div>
    </div>

    <button class="btn btn-primary" onclick="addBook()">Save Book</button>
    <button class="btn btn-secondary ms-2" onclick="showSection('catalog')">Cancel</button>
  </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="Assets/script.js"></script>
</body>
</html>