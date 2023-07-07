/*
 * Test suite for articles
 */
// const expect = require('chai').expect;
const fetch = require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {
    it('Backend: Unit test to validate POST /login', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                accountName: "hd25",
                password: "password-hd25"
            }),
            credentials: 'include'
        }).then(r => r.json()).then(r => {
            expect(r.accountName).toBe("hd25");
            expect(r.result).toBe("success");
            done();
        });
    });

    it('Backend: Unit test to validate POST /register', (done) => {
        fetch(url('/register'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            // This is the body for the post content
            body: JSON.stringify({accountName: "test",
                displayName: "test",
                emailAddress: "test@northeastern.edu",
                birthday: "1990-4-11",
                phoneNumber: "",
                zipCode: "12312",
                password: "123",
                avatar: "https://tomli.blog/wp-content/plugins/stronger-github-widget//img/octocat_big.png",
                headline: "I'm a new user, cool."}),
            credentials: 'include'
        }).then(r => r.json()).then(r => {
            expect(r.accountName).toBe("test");
            expect(r.result).toBe("success");
            done();
        });
    });

    it('Backend: Unit test to validate GET /headlines', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                accountName: "hd25",
                password: "password-hd25"
            }),
            credentials: 'include'
        }).then(r => {
            const cookie = r.headers.get('set-cookie');
            fetch(url('/headlines'), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Cookie: cookie},
                credentials: 'include'
            }).then(r => r.json()).then(r => {
                expect(r.headline.length).toBe(1);
                done();
            });
        });
    });

    it('Backend: Unit test to validate GET /articles', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                accountName: "hd25",
                password: "password-hd25"
            }),
            credentials: 'include'
        }).then(r => {
            const cookie = r.headers.get('set-cookie');
            fetch(url('/articles'), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Cookie: cookie},
                credentials: 'include'
            }).then(r => r.json()).then(r => {
                expect(r.articles.length).toBe(6);
                done();
            });
        });
    });

    it('Backend: Unit test to validate GET /articles/id', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                accountName: "hd25",
                password: "password-hd25"
            }),
            credentials: 'include'
        }).then(r => {
            const cookie = r.headers.get('set-cookie');
            const id = "hd25";
            fetch(url('/articles/' + id), {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Cookie: cookie},
                credentials: 'include'
            }).then(r => r.json()).then(r => {
                expect(r.articles.length).toBe(6);
                done();
            });
        });
    });

    it('Backend: Unit test to validate PUT /headline', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                accountName: "hd25",
                password: "password-hd25"
            }),
            credentials: 'include'
        }).then(r => {
            const cookie = r.headers.get('set-cookie');
            fetch(url('/headline'), {
                method: 'PUT',
                headers: {'Content-Type': 'application/json', Cookie: cookie},
                credentials: 'include',
                body: JSON.stringify({
                    accountName: "hd25",
                    headline: "hello, this is new test."
                })
            }).then(r => r.json()).then(r => {
                expect(r.accountName).toBe('hd25');
                expect(r.headline).toBe('hello, this is new test.');
                done();
            });
        });
    });

    it('Backend:Unit test to validate POST /article', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                accountName: "aw23",
                password: "password-aw23"
            }),
            credentials: 'include'
        }).then(r => {
            const cookie = r.headers.get('set-cookie');
            fetch(url('/article'), {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Cookie: cookie},
                credentials: 'include',
                body: JSON.stringify({author: "aw23", avatar: null, img: null, text: "hi im here to test post."})
            }).then(r => r.json()).then(r => {
                console.log(r.articles);
                expect(r.articles.length).toBe(r.beforePostLength + 1);
                expect(r.newPost.text).toBe( "hi im here to test post.");
                done();
            });
        });
    });

    it('Backend: Unit test to validate PUT /logout', (done) => {
        fetch(url('/login'), {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                accountName: "hd25",
                password: "password-hd25"
            }),
            credentials: 'include'
        }).then(r => {
            const cookie = r.headers.get('set-cookie');
            fetch(url('/logout'), {
                method: 'PUT',
                headers: {'Content-Type': 'application/json', Cookie: cookie},
                credentials: 'include'
            }).then(r => {
                expect(r.status).toBe(200);
                done();
            });
        });
    });

});

