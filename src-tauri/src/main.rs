#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
    use tauri::Manager;
  tauri::Builder::default()
      .setup(|app| {
          let main_window = app.get_window("setting").unwrap();
          main_window.open_devtools();
          Ok(())
      })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
