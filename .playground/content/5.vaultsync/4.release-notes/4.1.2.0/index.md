# 1.2.0

*Release Date: 2025-10-01*

VaultSync 1.2.0 introduces powerful compliance controls, real-time desktop collaboration, and deeper cloud integration. This release is designed to support enterprise-grade workflows and make secure file collaboration even smoother across teams and devices.

---

## ✨ New Features

### Workspace Compliance Settings

- Introduced support for **SOC 2 and HIPAA-aligned controls**  
- Admins can now enable data retention rules, access expiration policies, and audit trails  
- Compliance dashboard provides a centralized view of all security and governance settings

### Real-Time Desktop Co-Editing

- Collaborate on text documents simultaneously with **live presence indicators**  
- See who's viewing or editing a file in real time  
- Includes change tracking, inline comments, and auto-versioning

### Two-Way Sync with Box & Dropbox

- New integrations allow **bi-directional file sync** with Box and Dropbox accounts  
- Changes made in either system reflect automatically in VaultSync  
- Includes selective sync options and folder mapping

---

## 🛠 Improvements

- Added experimental **file locking** to prevent conflicts on large files  
- Improved file previewing for PDFs and Office documents (faster rendering, better zoom)  
- Updated API docs for external app integrations  
- Optimized permission analytics dashboard with faster filters and role breakdowns

---

## 🧪 Known Issues

- Real-time co-editing currently supported only for `.txt`, `.md`, and `.docx` formats  
- File locking is not yet enforced across mobile and desktop simultaneously  
- Some Box/Dropbox subfolders may require manual resync after initial link

---

## ⚙️ Upgrade Notes

- No manual migration required  
- Admins should review new compliance options under **Settings > Compliance**  
- Co-editing features are enabled by default but can be toggled off in workspace settings

---

## 🔭 What's Coming in 1.3.0

- Full audit trail export (JSON and CSV)  
- Granular permission automation via policy rules  
- Desktop bandwidth throttling  
- Mobile offline access mode

---

Need help with any of these features? Visit the [Help page](../help), or contact us at [support@vaultsync.app](mailto:support@vaultsync.app).
