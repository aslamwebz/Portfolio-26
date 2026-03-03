import sys
try:
    import pypdf
except ImportError:
    import os
    os.system('pip install pypdf')
    import pypdf

def extract_text(pdf_path):
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    print(extract_text(pdf_path))
