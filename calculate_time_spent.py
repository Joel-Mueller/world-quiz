import re

def calculate_total_time(filename):
    total_minutes = 0

    with open(filename, "r", encoding="utf-8") as file:
        for line in file:
            match = re.search(r'(\d{2}):(\d{2})', line)
            if match:
                hours, minutes = map(int, match.groups())
                total_minutes += hours * 60 + minutes

    total_hours, remaining_minutes = divmod(total_minutes, 60)
    print(f"Total time worked: {total_hours} hours and {remaining_minutes} minutes")
calculate_total_time("Arbeitsjournal.md")