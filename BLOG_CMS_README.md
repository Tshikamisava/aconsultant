# Blog CMS Documentation

## 🎉 Installation Complete!

Your Blog CMS is now ready to use. The system includes:

### ✅ Features Implemented

1. **Admin Dashboard** - Full-featured blog management interface
2. **Blog CRUD Operations** - Create, Read, Update, Delete blog posts
3. **Authentication** - Secure JWT-based login system
4. **Image Upload** - Upload and manage blog images
5. **SQLite Database** - Lightweight, file-based database
6. **API Endpoints** - RESTful API for frontend integration
7. **React Component** - Beautiful blog display on your website

---

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd server
node server.js
```

The server will run on **http://localhost:3001**

### 2. Access Admin Dashboard

Open in your browser:
```
http://localhost:3001/admin.html
```

**Default Login Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change the default password after first login!

### 3. Start Your Frontend

```bash
npm run dev
```

Your website with the blog section will be available at **http://localhost:5173**

---

## 📋 API Endpoints

### Public Endpoints (No Authentication Required)

#### Get All Published Blogs
```
GET /api/blogs
```

#### Get Single Blog by Slug
```
GET /api/blogs/:slug
```

#### Get Blogs by Category
```
GET /api/blogs/category/:category
```

### Admin Endpoints (Authentication Required)

#### Login
```
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
```

#### Verify Token
```
GET /api/auth/verify
Headers: { "Authorization": "Bearer <token>" }
```

#### Get All Blogs (Including Drafts)
```
GET /api/admin/blogs
Headers: { "Authorization": "Bearer <token>" }
```

#### Get Single Blog by ID
```
GET /api/admin/blogs/:id
Headers: { "Authorization": "Bearer <token>" }
```

#### Create New Blog
```
POST /api/admin/blogs
Headers: { "Authorization": "Bearer <token>" }
Body: {
  "title": "Blog Title",
  "slug": "blog-title",
  "excerpt": "Short description",
  "content": "Full blog content",
  "author": "Author Name",
  "featured_image": "/uploads/image.jpg",
  "category": "Category",
  "tags": "tag1, tag2, tag3",
  "status": "published" // or "draft"
}
```

#### Update Blog
```
PUT /api/admin/blogs/:id
Headers: { "Authorization": "Bearer <token>" }
Body: { ...same as create... }
```

#### Delete Blog
```
DELETE /api/admin/blogs/:id
Headers: { "Authorization": "Bearer <token>" }
```

#### Upload Image
```
POST /api/admin/upload
Headers: { "Authorization": "Bearer <token>" }
Body: FormData with 'image' field
```

#### Get All Images
```
GET /api/admin/images
Headers: { "Authorization": "Bearer <token>" }
```

#### Delete Image
```
DELETE /api/admin/images/:id
Headers: { "Authorization": "Bearer <token>" }
```

---

## 📁 File Structure

```
server/
├── server.js           # Main server file
├── database.js         # Database schema and queries
├── auth.js            # Authentication middleware
├── blog-routes.js     # Blog API routes
├── admin.html         # Admin dashboard (CMS interface)
├── .env               # Environment variables
├── blog.db            # SQLite database (auto-created)
└── uploads/           # Uploaded images (auto-created)

src/
└── components/
    └── BlogSection.tsx  # React component for displaying blogs
```

---

## 🎨 Using the Admin Dashboard

### Creating a New Blog Post

1. Login to admin dashboard
2. Click "Create New" tab or "➕ Create New Blog" button
3. Fill in the form:
   - **Title**: Blog post title (auto-generates slug)
   - **Slug**: URL-friendly version (e.g., "my-blog-post")
   - **Excerpt**: Short description for previews
   - **Content**: Full blog post content
   - **Author**: Your name or company name
   - **Category**: e.g., "Engineering", "Technology"
   - **Tags**: Comma-separated (e.g., "design, architecture")
   - **Featured Image**: Upload or enter image URL
   - **Status**: "Draft" (hidden) or "Published" (visible)
4. Click "Create Blog"

### Editing a Blog Post

1. Go to "All Blogs" tab
2. Click "Edit" button on any blog
3. Make your changes
4. Click "Update Blog"

### Deleting a Blog Post

1. Go to "All Blogs" tab
2. Click "Delete" button
3. Confirm deletion

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for passwords
- **Rate Limiting** - Prevents spam on email endpoint
- **CORS Protection** - Configured allowed origins
- **Helmet Security** - HTTP security headers
- **Input Validation** - Validates all user inputs

---

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `password` - Hashed password
- `email` - User email
- `role` - User role (admin)
- `created_at` - Timestamp

### Blogs Table
- `id` - Primary key
- `title` - Blog title
- `slug` - URL-friendly slug
- `excerpt` - Short description
- `content` - Full content
- `author` - Author name
- `featured_image` - Image URL
- `category` - Blog category
- `tags` - Comma-separated tags
- `status` - "draft" or "published"
- `published_at` - Publish date
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Images Table
- `id` - Primary key
- `filename` - File name
- `original_name` - Original file name
- `path` - File path
- `size` - File size in bytes
- `mimetype` - MIME type
- `uploaded_at` - Upload timestamp

---

## 🛠️ Customization

### Change Admin Password

1. Login with default credentials
2. Use the API endpoint:
```javascript
fetch('http://localhost:3001/api/admin/change-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <your-token>'
  },
  body: JSON.stringify({
    newPassword: 'your-new-secure-password'
  })
});
```

### Customize JWT Secret

In `server/.env`, add:
```
JWT_SECRET=your-super-secret-key-here
```

### Customize Blog Display

Edit `src/components/BlogSection.tsx` to change:
- Grid layout (currently 3 columns)
- Card styling
- Read more behavior
- Date formatting

---

## 🌐 Production Deployment

### Before Deploying:

1. **Change default admin password**
2. **Set strong JWT_SECRET in .env**
3. **Update ALLOWED_ORIGINS in .env**
4. **Use HTTPS in production**
5. **Set up proper backups for blog.db**
6. **Consider using PostgreSQL or MySQL for production**

### Environment Variables for Production:

```env
PORT=3001
JWT_SECRET=your-production-secret-key
ALLOWED_ORIGINS=https://yourdomain.com
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
EMAIL_TO=recipient@email.com
```

---

## 🐛 Troubleshooting

### Server Won't Start
- Make sure port 3001 is not in use
- Check if all dependencies are installed: `npm install`

### Can't Login to Admin
- Check console for errors
- Verify server is running on port 3001
- Clear browser localStorage and try again

### Blogs Not Showing on Website
- Check browser console for errors
- Verify API_URL in BlogSection.tsx
- Make sure blogs are set to "published" status
- Check server is running and accessible

### Image Upload Not Working
- Check `server/uploads/` directory exists
- Verify file size is under 5MB
- Check file is an image (jpg, png, gif, webp)

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review server console logs
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

## 🎯 Next Steps

- [ ] Create your first blog post
- [ ] Change default admin password
- [ ] Upload custom images
- [ ] Customize blog styling
- [ ] Set up production deployment
- [ ] Add more admin users (optional)
- [ ] Implement blog categories filtering
- [ ] Add blog search functionality

---

**Your Blog CMS is ready to use!** 🚀

Visit http://localhost:3001/admin.html to start managing your blogs.
