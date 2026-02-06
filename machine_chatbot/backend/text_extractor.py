import os

DATA_DIR = "data"

def extract_text_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def extract_all_manuals():
    manuals_text = {}

    for machine_folder in os.listdir(DATA_DIR):
        machine_path = os.path.join(DATA_DIR, machine_folder)

        if os.path.isdir(machine_path):
            for file in os.listdir(machine_path):
                if file.endswith(".txt"):
                    file_path = os.path.join(machine_path, file)
                    text = extract_text_from_txt(file_path)
                    manuals_text[machine_folder] = text

    return manuals_text


if __name__ == "__main__":
    manuals = extract_all_manuals()

    for machine, text in manuals.items():
        print(f"\n--- {machine.upper()} MANUAL TEXT ---")
        print(text)
