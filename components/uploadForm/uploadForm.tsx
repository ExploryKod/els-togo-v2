"use client";

export const UploadForm = () => {
  return (
    <input
      type="file"
      name="file"
      onChange={async (e) => {
        if (e.target.files) {
          const file = e.target.files[0]; 
          const formData = new FormData();
          formData.append("file", file);
      
          const checkResponse = await fetch(`/api/check-file?name=${file.name}`);
          const checkResult = await checkResponse.json();

      
          if (checkResult.exists) {
            const overwrite = confirm(
              `A file named "${file.name}" existe déjà, voulez-vous remplacer définitivement le fichier existant ?`
            );

            if (!overwrite) {
              alert(
                "Pour charger ce fichier il doit être renommé avant d'être chargé à nouveau."
              );
              return;
            }
          }

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();
          if (result.success) {
            alert("Upload successful: " + result.name);
          } else {
            alert("Upload failed");
          }
        }
      }}
    />
  );
};
