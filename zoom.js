function openFullscreen(img) {
                    var modal = document.getElementById('fullscreen-modal');
                    var modalImg = document.getElementById('fullscreen-img');
                    modalImg.src = img.src;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
                document.getElementById('close-fullscreen').onclick = function() {
                    document.getElementById('fullscreen-modal').style.display = 'none';
                    document.body.style.overflow = '';
                };
                document.getElementById('fullscreen-modal').onclick = function(e) {
                    if (e.target === this) {
                        this.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                };
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        document.getElementById('fullscreen-modal').style.display = 'none';
                        document.body.style.overflow = '';
                    }
                });