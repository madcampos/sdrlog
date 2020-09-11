$SrcPath = Resolve-Path "$(Read-Host 'Path to files: ')"
$DestPath = './dist/covers'

New-Item $DestPath -ItemType 'Directory'
$DestPath = Resolve-Path $DestPath

Get-ChildItem -Recurse -File "$SrcPath/*.pdf" |
ForEach-Object {
	$NewName = $_.BaseName -replace '^(.*?) - .*$', '$1';

	gm.exe convert -resize x1024 -background white "$_[0]" "$DestPath/$NewName.jpg"
}
