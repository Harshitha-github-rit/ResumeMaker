import os
import zipfile

def create_zip():
    output_filename = 'public/resumecraft-source.zip'
    os.makedirs('public', exist_ok=True)

    exclude_dirs = {'node_modules', '.git', 'dist', '.next', '.cache', '__pycache__', '.turbo'}
    exclude_files = {output_filename, '.DS_Store'}

    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('.'):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, '.')
                if rel_path.startswith('public/resumecraft-source.zip') or file in exclude_files:
                    continue
                zipf.write(file_path, rel_path)

    print(f"Zip archive created at {output_filename} ({os.path.getsize(output_filename)} bytes)")

if __name__ == '__main__':
    create_zip()
