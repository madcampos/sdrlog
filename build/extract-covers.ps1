$SrcPath = Resolve-Path "$(Read-Host 'Path to files: ')"
$DestPath = './covers'

New-Item $DestPath -ItemType 'Directory'
$DestPath = Resolve-Path $DestPath

Get-ChildItem -Recurse -File "$SrcPath/*.pdf" |
ForEach-Object {
	$NewName = $_.BaseName -replace '^(.*?) - .*$', '$1.jpg';

	if (-not (Test-Path "$DestPath/$NewName")) {
		gm.exe convert -resize x1024 -background white "$_[0]" "$DestPath/$NewName"
	} else {
		Write-Host "`"$NewName`" already exist."
	}
}
