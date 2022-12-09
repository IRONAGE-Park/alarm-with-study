Var SystemDrive

!include nsDialogs.nsh
!include LogicLib.nsh

!macro preInit
    ReadEnvStr $SystemDrive ProgramFiles
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\INVALG Studio"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\INVALG Studio"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\INVALG Studio"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\INVALG Studio"
!macroend

