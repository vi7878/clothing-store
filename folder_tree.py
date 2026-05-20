import os
from datetime import datetime


def get_folder_tree(path, output_file, indent="", prefix=""):
    """
    Recursively display folder structure, file names, and their contents,
    writing the output to a text file.
    """
    try:
        # Get list of items in the directory
        items = sorted(os.listdir(path))
        with open(output_file, "a", encoding="utf-8") as f:
            for index, item in enumerate(items):
                item_path = os.path.join(path, item)
                # Determine the prefix for the last item
                is_last = index == len(items) - 1
                current_prefix = "└── " if is_last else "├── "
                # Write the current item
                f.write(f"{indent}{prefix}{current_prefix}{item}\n")

                if os.path.isdir(item_path):
                    # If it's a directory, recurse with updated indent
                    new_indent = indent + ("    " if is_last else "│   ")
                    get_folder_tree(item_path, output_file, new_indent, "")
                elif os.path.isfile(item_path):
                    # If it's a file, try to read and write its contents
                    try:
                        with open(item_path, "r", encoding="utf-8") as file:
                            content = file.read()
                            # Write file contents with indentation
                            f.write(
                                f"{indent}{prefix}{'    ' if is_last else '│   '}Content:\n"
                            )
                            for line in content.splitlines():
                                f.write(
                                    f"{indent}{prefix}{'    ' if is_last else '│   '}    {line}\n"
                                )
                    except (UnicodeDecodeError, PermissionError, IOError):
                        f.write(
                            f"{indent}{prefix}{'    ' if is_last else '│   '}Content: [Unable to read file]\n"
                        )
    except (PermissionError, OSError):
        with open(output_file, "a", encoding="utf-8") as f:
            f.write(
                f"{indent}{prefix}└── [Permission denied or error accessing {path}]\n"
            )


def main():
    # Get current directory
    root_path = os.getcwd()
    # Create output file name with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"folder_tree_{timestamp}.txt"

    # Initialize output file
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(f"Folder Tree for {root_path}\n")
        f.write(
            "Generated on: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n\n"
        )

    # Write folder tree to file
    with open(output_file, "a", encoding="utf-8") as f:
        f.write(os.path.basename(root_path) + "\n")
    get_folder_tree(root_path, output_file, "", "")

    print(f"Folder tree has been written to {output_file}")


if __name__ == "__main__":
    main()
