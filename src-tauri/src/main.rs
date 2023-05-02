#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
    use tauri::Manager;
  tauri::Builder::default()
      .setup(|app| {
          app.get_window("setting").unwrap().open_devtools();
          app.get_window("alarm").unwrap().open_devtools();
          Ok(())
      })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
