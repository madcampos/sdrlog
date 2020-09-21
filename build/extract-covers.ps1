$SrcPath = "$(Read-Host 'Path to files')"
$DestPath = './covers'

$SrcPath = ($SrcPath -replace @('"', '')).Trim()
$SrcPath = ($SrcPath -replace @("'", '')).Trim()

New-Item $DestPath -ItemType 'Directory' -ErrorAction 'SilentlyContinue'
$DestPath = Resolve-Path $DestPath

Get-ChildItem -Recurse -File "$SrcPath/*.pdf" |
Where-Object {
	($_.FullName -replace @([regex]::escape($SrcPath), '')) -inotmatch '^\\?unofficial'
} |
ForEach-Object {
	$NewName = "$($_.BaseName -replace '^(.*?) - .*$', '$1').jpg";

	if (-not (Test-Path "$DestPath/$NewName")) {
		Write-Host $NewName -ForegroundColor 'DarkGreen'
		gm.exe convert -resize x2048 "$_[0]" "$DestPath/$NewName"
	} else {
		Write-Host $NewName -ForegroundColor 'Red'
	}
}
