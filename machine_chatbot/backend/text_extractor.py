#text_extractor.py
import os

DATA_DIR = "data"

def extract_text_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def extract_text_from_pdf(file_path):
    try:
        import PyPDF2
        text = ""
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text
    except ImportError:
        print("PyPDF2 is not installed. Run `pip install PyPDF2` to read PDFs.")
        return ""
    except Exception as e:
        print(f"Error reading PDF {file_path}: {e}")
        return ""

def extract_text_from_docx(file_path):
    try:
        import docx
        text = ""
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    except ImportError:
        print("python-docx is not installed. Run `pip install python-docx` to read DOCX files.")
        return ""
    except Exception as e:
        print(f"Error reading DOCX {file_path}: {e}")
        return ""

def extract_text_from_xlsx(file_path):
    try:
        import pandas as pd
        text = ""
        # Read all sheets
        dfs = pd.read_excel(file_path, sheet_name=None)
        for sheet_name, df in dfs.items():
            text += f"--- Sheet: {sheet_name} ---\n"
            text += df.to_string(index=False) + "\n"
        return text
    except ImportError:
        print("pandas or openpyxl is not installed. Run `pip install pandas openpyxl` to read XLSX files.")
        return ""
    except Exception as e:
        print(f"Error reading XLSX {file_path}: {e}")
        return ""

def extract_all_manuals():
    manuals_text = {}

    for machine_folder in os.listdir(DATA_DIR):
        machine_path = os.path.join(DATA_DIR, machine_folder)

        if os.path.isdir(machine_path):
            machine_text = ""
            for file in os.listdir(machine_path):
                file_path = os.path.join(machine_path, file)
                text = ""
                
                if file.endswith(".txt"):
                    text = extract_text_from_txt(file_path)
                elif file.endswith(".pdf"):
                    text = extract_text_from_pdf(file_path)
                elif file.endswith(".docx"):
                    text = extract_text_from_docx(file_path)
                elif file.endswith(".xlsx"):
                    text = extract_text_from_xlsx(file_path)
                
                if text:
                    # Append text from all documents in the folder
                    machine_text += f"\n\n--- Document: {file} ---\n\n" + text
            
            if machine_text:
                manuals_text[machine_folder] = machine_text

    return manuals_text


if __name__ == "__main__":
    manuals = extract_all_manuals()

    for machine, text in manuals.items():
        print(f"\n--- {machine.upper()} MANUAL TEXT ---")
        print(text)
